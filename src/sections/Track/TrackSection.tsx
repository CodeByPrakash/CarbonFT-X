import { useState, useCallback, useMemo } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useCarbonData } from '@/contexts/CarbonDataContext';
import { calculateTransportEmissions, calculateFoodEmissions, calculateEnergyEmissions, calculateShoppingEmissions } from '@/lib/emissions';
import type { TransportData, FoodData, EnergyData, ShoppingData } from '@/types';
import { Car, UtensilsCrossed, Zap, ShoppingBag, Check } from 'lucide-react';

const tabs = [
  { id: 'transport', label: 'Transport', icon: Car },
  { id: 'food', label: 'Food', icon: UtensilsCrossed },
  { id: 'energy', label: 'Energy', icon: Zap },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
];

const defaultTransport: TransportData = {
  carDistance: 0, carUnit: 'km', carFuel: 'gasoline',
  publicTransitDistance: 0, publicTransitUnit: 'km',
  flightDistance: 0, flightUnit: 'km', flightRoundTrip: false,
  activeDistance: 0, activeUnit: 'km',
};

const defaultFood: FoodData = {
  meatMeals: 0, vegetarianMeals: 0, veganMeals: 0,
  foodWaste: 'minimal', takeoutMeals: 0,
};

const defaultEnergy: EnergyData = {
  electricityUsage: 50, heatingType: 'gas', renewablePercent: 20, deviceHours: 8,
};

const defaultShopping: ShoppingData = {
  clothingItems: 0, electronicsPurchase: false, packaging: 'standard', secondhandItems: 0,
};

export function TrackSection() {
  const [activeTab, setActiveTab] = useState('transport');
  const [transport, setTransport] = useState<TransportData>(defaultTransport);
  const [food, setFood] = useState<FoodData>(defaultFood);
  const [energy, setEnergy] = useState<EnergyData>(defaultEnergy);
  const [shopping, setShopping] = useState<ShoppingData>(defaultShopping);
  const [submitted, setSubmitted] = useState(false);
  const { addActivity } = useCarbonData();

  const transportCO2 = useMemo(() => calculateTransportEmissions(transport), [transport]);
  const foodCO2 = useMemo(() => calculateFoodEmissions(food), [food]);
  const energyCO2 = useMemo(() => calculateEnergyEmissions(energy), [energy]);
  const shoppingCO2 = useMemo(() => calculateShoppingEmissions(shopping), [shopping]);

  const totalCO2 = useMemo(() => {
    return Math.max(0, transportCO2 + foodCO2 + energyCO2 + shoppingCO2);
  }, [transportCO2, foodCO2, energyCO2, shoppingCO2]);

  const getImpactColor = (value: number) => {
    if (value <= 2) return '#52B788';
    if (value <= 8) return '#F9A826';
    return '#FF6B6B';
  };

  const getImpactLabel = (value: number) => {
    if (value <= 2) return 'Low';
    if (value <= 8) return 'Medium';
    return 'High';
  };

  const handleSubmit = useCallback(() => {
    const now = new Date().toISOString();
    if (transportCO2 > 0) {
      addActivity({
        id: `transport-${Date.now()}`,
        category: 'transport',
        activity: 'Transport',
        value: transport.carDistance + transport.publicTransitDistance + transport.flightDistance,
        unit: 'km',
        co2e: transportCO2,
        date: now,
      });
    }
    if (foodCO2 > 0) {
      addActivity({
        id: `food-${Date.now()}`,
        category: 'food',
        activity: 'Food',
        value: food.meatMeals + food.vegetarianMeals + food.veganMeals,
        unit: 'meals',
        co2e: foodCO2,
        date: now,
      });
    }
    if (energyCO2 > 0) {
      addActivity({
        id: `energy-${Date.now()}`,
        category: 'energy',
        activity: 'Energy',
        value: energy.electricityUsage,
        unit: '%',
        co2e: energyCO2,
        date: now,
      });
    }
    if (shoppingCO2 > 0) {
      addActivity({
        id: `shopping-${Date.now()}`,
        category: 'shopping',
        activity: 'Shopping',
        value: shopping.clothingItems,
        unit: 'items',
        co2e: shoppingCO2,
        date: now,
      });
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTransport(defaultTransport);
      setFood(defaultFood);
      setEnergy(defaultEnergy);
      setShopping(defaultShopping);
    }, 2000);
  }, [transport, food, energy, shopping, transportCO2, foodCO2, energyCO2, shoppingCO2, addActivity]);

  return (
    <section id="track" className="section-padding bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-hero/20 to-transparent" />

      <div className="max-w-[900px] mx-auto">
        <SectionHeader
          label="TRACK YOUR FOOTPRINT"
          headline="What did your day look like?"
          subtext="Log your activities and see how they add up. Small changes make a big difference."
        />

        {/* Category Tabs */}
        <ScrollReveal className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-pill text-[1.3rem] font-medium transition-all duration-200
                  ${activeTab === tab.id
                    ? 'bg-forest-deep text-white border-l-[3px] border-forest-sage'
                    : 'bg-forest-mint text-gray-600 hover:bg-forest-pale'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </ScrollReveal>

        {/* Form Card */}
        <ScrollReveal variant="scale">
          <div className="bg-white border border-gray-200 rounded-[20px] p-6 md:p-10 shadow-card">
            {/* Transport Form */}
            {activeTab === 'transport' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Car className="w-8 h-8 text-forest" />
                  <div>
                    <h3 className="text-[2rem] font-semibold text-forest-deep">Transport</h3>
                    <p className="text-gray-500 text-[1.3rem]">How did you get around today?</p>
                  </div>
                </div>

                <FormRow label="Car distance">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      value={transport.carDistance || ''}
                      onChange={(e) => setTransport({ ...transport, carDistance: Number(e.target.value) })}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-[1.5rem] focus:outline-none focus:border-forest-sage focus:ring-2 focus:ring-forest-sage/20 transition-all"
                      placeholder="0"
                    />
                    <select
                      value={transport.carFuel}
                      onChange={(e) => setTransport({ ...transport, carFuel: e.target.value as TransportData['carFuel'] })}
                      className="px-3 py-3 border border-gray-200 rounded-xl text-[1.3rem] focus:outline-none focus:border-forest-sage"
                    >
                      <option value="gasoline">Gasoline</option>
                      <option value="diesel">Diesel</option>
                      <option value="electric">Electric</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  <ImpactBadge value={transportCO2} />
                </FormRow>

                <FormRow label="Public transit distance (km)">
                  <input
                    type="number"
                    min="0"
                    value={transport.publicTransitDistance || ''}
                    onChange={(e) => setTransport({ ...transport, publicTransitDistance: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[1.5rem] focus:outline-none focus:border-forest-sage focus:ring-2 focus:ring-forest-sage/20"
                    placeholder="0"
                  />
                  <ImpactBadge value={transport.publicTransitDistance * 0.04} color="#52B788" />
                </FormRow>

                <FormRow label="Flight distance (km)">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      value={transport.flightDistance || ''}
                      onChange={(e) => setTransport({ ...transport, flightDistance: Number(e.target.value) })}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-[1.5rem] focus:outline-none focus:border-forest-sage focus:ring-2 focus:ring-forest-sage/20"
                      placeholder="0"
                    />
                    <label className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl cursor-pointer">
                      <input
                        type="checkbox"
                        checked={transport.flightRoundTrip}
                        onChange={(e) => setTransport({ ...transport, flightRoundTrip: e.target.checked })}
                        className="w-4 h-4 accent-forest-sage"
                      />
                      <span className="text-[1.3rem]">Round trip</span>
                    </label>
                  </div>
                  <ImpactBadge value={transport.flightDistance * 0.15 * (transport.flightRoundTrip ? 2 : 1)} />
                </FormRow>

                <FormRow label="Walking/cycling distance (km)">
                  <input
                    type="number"
                    min="0"
                    value={transport.activeDistance || ''}
                    onChange={(e) => setTransport({ ...transport, activeDistance: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[1.5rem] focus:outline-none focus:border-forest-sage focus:ring-2 focus:ring-forest-sage/20"
                    placeholder="0"
                  />
                  <span className="inline-flex items-center gap-1 mt-1 text-teal text-[1.2rem] font-medium">
                    <Check className="w-3 h-3" /> 0 kg CO2 — Great job!
                  </span>
                </FormRow>
              </div>
            )}

            {/* Food Form */}
            {activeTab === 'food' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <UtensilsCrossed className="w-8 h-8 text-amber" />
                  <div>
                    <h3 className="text-[2rem] font-semibold text-forest-deep">Food</h3>
                    <p className="text-gray-500 text-[1.3rem]">What did you eat today?</p>
                  </div>
                </div>

                <FormRow label="Meals with meat">
                  <input
                    type="number" min="0"
                    value={food.meatMeals || ''}
                    onChange={(e) => setFood({ ...food, meatMeals: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[1.5rem] focus:outline-none focus:border-forest-sage focus:ring-2 focus:ring-forest-sage/20"
                    placeholder="0"
                  />
                  <ImpactBadge value={food.meatMeals * 3.3} />
                </FormRow>

                <FormRow label="Vegetarian meals">
                  <input
                    type="number" min="0"
                    value={food.vegetarianMeals || ''}
                    onChange={(e) => setFood({ ...food, vegetarianMeals: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[1.5rem] focus:outline-none focus:border-forest-sage focus:ring-2 focus:ring-forest-sage/20"
                    placeholder="0"
                  />
                  <ImpactBadge value={food.vegetarianMeals * 0.4} color="#52B788" />
                </FormRow>

                <FormRow label="Vegan meals">
                  <input
                    type="number" min="0"
                    value={food.veganMeals || ''}
                    onChange={(e) => setFood({ ...food, veganMeals: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[1.5rem] focus:outline-none focus:border-forest-sage focus:ring-2 focus:ring-forest-sage/20"
                    placeholder="0"
                  />
                  <ImpactBadge value={food.veganMeals * 0.2} color="#52B788" />
                </FormRow>

                <FormRow label="Food waste">
                  <select
                    value={food.foodWaste}
                    onChange={(e) => setFood({ ...food, foodWaste: e.target.value as FoodData['foodWaste'] })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[1.5rem] focus:outline-none focus:border-forest-sage focus:ring-2 focus:ring-forest-sage/20"
                  >
                    <option value="none">None</option>
                    <option value="minimal">Minimal</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                  </select>
                  <ImpactBadge value={{ none: 0, minimal: 0.5, moderate: 1.5, high: 3 }[food.foodWaste]} />
                </FormRow>

                <FormRow label="Takeout meals">
                  <input
                    type="number" min="0"
                    value={food.takeoutMeals || ''}
                    onChange={(e) => setFood({ ...food, takeoutMeals: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[1.5rem] focus:outline-none focus:border-forest-sage focus:ring-2 focus:ring-forest-sage/20"
                    placeholder="0"
                  />
                  <ImpactBadge value={food.takeoutMeals * 0.3} />
                </FormRow>
              </div>
            )}

            {/* Energy Form */}
            {activeTab === 'energy' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-8 h-8 text-sky" />
                  <div>
                    <h3 className="text-[2rem] font-semibold text-forest-deep">Energy</h3>
                    <p className="text-gray-500 text-[1.3rem]">How was your energy usage?</p>
                  </div>
                </div>

                <FormRow label="Electricity usage">
                  <input
                    type="range" min="0" max="100"
                    value={energy.electricityUsage}
                    onChange={(e) => setEnergy({ ...energy, electricityUsage: Number(e.target.value) })}
                    className="w-full accent-forest-sage"
                  />
                  <div className="flex justify-between text-[1.2rem] text-gray-400 mt-1">
                    <span>Low</span>
                    <span className="font-medium text-forest">{energy.electricityUsage}%</span>
                    <span>High</span>
                  </div>
                  <ImpactBadge value={energyCO2} />
                </FormRow>

                <FormRow label="Heating type">
                  <select
                    value={energy.heatingType}
                    onChange={(e) => setEnergy({ ...energy, heatingType: e.target.value as EnergyData['heatingType'] })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[1.5rem] focus:outline-none focus:border-forest-sage focus:ring-2 focus:ring-forest-sage/20"
                  >
                    <option value="electric">Electric</option>
                    <option value="gas">Natural Gas</option>
                    <option value="oil">Oil</option>
                    <option value="renewable">Renewable</option>
                  </select>
                </FormRow>

                <FormRow label="Renewable energy %">
                  <input
                    type="range" min="0" max="100"
                    value={energy.renewablePercent}
                    onChange={(e) => setEnergy({ ...energy, renewablePercent: Number(e.target.value) })}
                    className="w-full accent-teal"
                  />
                  <div className="text-center text-[1.2rem] text-teal font-medium mt-1">{energy.renewablePercent}%</div>
                </FormRow>
              </div>
            )}

            {/* Shopping Form */}
            {activeTab === 'shopping' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <ShoppingBag className="w-8 h-8 text-purple-500" />
                  <div>
                    <h3 className="text-[2rem] font-semibold text-forest-deep">Shopping</h3>
                    <p className="text-gray-500 text-[1.3rem]">What did you buy today?</p>
                  </div>
                </div>

                <FormRow label="New clothing items">
                  <input
                    type="number" min="0"
                    value={shopping.clothingItems || ''}
                    onChange={(e) => setShopping({ ...shopping, clothingItems: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[1.5rem] focus:outline-none focus:border-forest-sage focus:ring-2 focus:ring-forest-sage/20"
                    placeholder="0"
                  />
                  <ImpactBadge value={shopping.clothingItems * 5} />
                </FormRow>

                <FormRow label="Electronics purchased">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={!shopping.electronicsPurchase}
                        onChange={() => setShopping({ ...shopping, electronicsPurchase: false })}
                        className="accent-forest-sage"
                      />
                      <span className="text-[1.4rem]">No</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={shopping.electronicsPurchase}
                        onChange={() => setShopping({ ...shopping, electronicsPurchase: true })}
                        className="accent-forest-sage"
                      />
                      <span className="text-[1.4rem]">Yes</span>
                    </label>
                  </div>
                  {shopping.electronicsPurchase && <ImpactBadge value={50} />}
                </FormRow>

                <FormRow label="Secondhand purchases">
                  <input
                    type="number" min="0"
                    value={shopping.secondhandItems || ''}
                    onChange={(e) => setShopping({ ...shopping, secondhandItems: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[1.5rem] focus:outline-none focus:border-forest-sage focus:ring-2 focus:ring-forest-sage/20"
                    placeholder="0"
                  />
                  <ImpactBadge value={-shopping.secondhandItems * 2} color="#52B788" label="Offset" />
                </FormRow>
              </div>
            )}

            {/* Summary */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="bg-forest-mint rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[1.6rem] font-semibold text-forest-deep">Today&apos;s Impact</h4>
                  <span
                    className="px-3 py-1 rounded-pill text-[1.1rem] font-medium text-white"
                    style={{ backgroundColor: getImpactColor(totalCO2) }}
                  >
                    {getImpactLabel(totalCO2)} Impact
                  </span>
                </div>

                {/* Breakdown bar */}
                <div className="flex h-3 rounded-full overflow-hidden mb-4">
                  <div style={{ width: `${Math.max(5, (transportCO2 / Math.max(totalCO2, 1)) * 100)}%`, backgroundColor: '#FF6B6B' }} />
                  <div style={{ width: `${Math.max(5, (foodCO2 / Math.max(totalCO2, 1)) * 100)}%`, backgroundColor: '#F9A826' }} />
                  <div style={{ width: `${Math.max(5, (energyCO2 / Math.max(totalCO2, 1)) * 100)}%`, backgroundColor: '#4ECDC4' }} />
                  <div style={{ width: `${Math.max(5, (shoppingCO2 / Math.max(totalCO2, 1)) * 100)}%`, backgroundColor: '#9B59B6' }} />
                </div>

                <div className="flex flex-wrap gap-4 text-[1.2rem] mb-3">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-coral" /> Transport</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber" /> Food</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky" /> Energy</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" /> Shopping</span>
                </div>

                <p className="text-[2.4rem] font-bold font-mono-data" style={{ color: getImpactColor(totalCO2) }}>
                  {totalCO2.toFixed(1)} <span className="text-[1.4rem] font-normal">kg CO2e</span>
                </p>

                {totalCO2 > 0 && (
                  <p className="text-gray-500 text-[1.3rem] mt-1">
                    That&apos;s like driving {Math.round(totalCO2 * 4)} km in an average car
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitted || totalCO2 <= 0}
                className={`w-full mt-6 py-4 rounded-pill text-[1.6rem] font-semibold text-white transition-all duration-300
                  ${submitted
                    ? 'bg-forest-sage'
                    : totalCO2 > 0
                      ? 'btn-primary cursor-pointer'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
              >
                {submitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" /> Activities Logged!
                  </span>
                ) : (
                  'Log Activities'
                )}
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[1.4rem] font-medium text-forest-deep mb-2">{label}</label>
      {children}
    </div>
  );
}

function ImpactBadge({ value, color, label = 'CO2' }: { value: number; color?: string; label?: string }) {
  const bg = color || (value <= 2 ? '#D8F3DC' : value <= 8 ? '#FFF8E1' : '#FFEBEE');
  const text = color || (value <= 2 ? '#2D6A4F' : value <= 8 ? '#F9A826' : '#FF6B6B');
  const prefix = value < 0 ? '-' : '~';
  const absVal = Math.abs(value);

  return (
    <span
      className="inline-block mt-1 px-3 py-1 rounded-pill text-[1.2rem] font-medium"
      style={{ backgroundColor: bg, color: text }}
    >
      {prefix}{absVal.toFixed(1)} kg {label}
    </span>
  );
}
