export interface Car {
  id: string;
  name: string;
  tagline: string;
  season: string;
  chassis: string;
  engine: string;
  themeColor: string;
  accentColor: string;
  gradient: string;
  folderPath: string;
  stats: { label: string; value: string; unit: string }[];
  driverPair: { name: string; number: string; nationality: string }[];
  section1: { headline: string; sub: string };
  section2: { headline: string; sub: string };
  section3: { headline: string; sub: string };
  section4: { headline: string; sub: string };
  storySection: { title: string; body: string };
  techSection: { title: string; body: string; specHighlights: string[] };
  achievements: { label: string; value: string }[];
  ctaSection: { price: string; unit: string; tagline: string; deliveryNote: string };
}

export const cars: Car[] = [
  {
    id: "rb20",
    name: "RB20",
    tagline: "Unbeatable in every condition.",
    season: "2024",
    chassis: "RB20 Monocoque Carbon Fibre",
    engine: "Honda RBPTH002 1.6L V6 Hybrid",
    themeColor: "#E4002B",
    accentColor: "#0091FF",
    gradient: "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)",
    folderPath: "/images/f1",
    stats: [
      { label: "Top Speed", value: "365", unit: "km/h" },
      { label: "0–100", value: "2.6", unit: "sec" },
      { label: "Downforce", value: "3500", unit: "N" },
      { label: "Weight", value: "798", unit: "kg" }
    ],
    driverPair: [
      { name: "Max Verstappen", number: "1", nationality: "NED" },
      { name: "Sergio Perez", number: "11", nationality: "MEX" }
    ],
    section1: { headline: "RB20.", sub: "Born to dominate." },
    section2: { headline: "Zero drag. Maximum grip.", sub: "Radical underfloor aerodynamics delivering unprecedented downforce across all circuit types." },
    section3: { headline: "Hybrid precision.", sub: "Honda's RBPTH002 power unit delivers a seamless 1000+ horsepower surge with zero hesitation." },
    section4: { headline: "Engineered to win.", sub: "" },
    storySection: {
      title: "The Anatomy of a Champion",
      body: "The RB20 represents the pinnacle of aerodynamic engineering. Every millimetre of bodywork was sculpted in Milton Keynes wind tunnels. The car's revolutionary sidepod concept channels airflow with surgical precision — producing massive downforce while slashing drag coefficients to record-low levels. This is not just a race car; it is a 798kg theorem in carbon fibre."
    },
    techSection: {
      title: "Power Beyond Physics",
      body: "Honda's RBPTH002 hybrid power unit operates at the boundary of what thermodynamics allows. Combustion temperatures exceed 2500°C. The MGU-K and MGU-H work in concert to reclaim over 160 kW from braking and exhaust energy, deploying it as a seamless surge exiting corners. Zero turbo lag. Maximum attack.",
      specHighlights: ["1000+ HP Combined Output", "MGU-K + MGU-H Hybrid Recovery", "F1 Homologated Unit", "Sub-2ms Throttle Response"]
    },
    achievements: [
      { label: "Race Wins", value: "21/24" },
      { label: "Constructors", value: "4th Title" },
      { label: "Drivers Title", value: "Max #4" },
      { label: "Fastest Laps", value: "18" }
    ],
    ctaSection: {
      price: "₹4,999",
      unit: "Official Scale Model 1:18",
      tagline: "Own a piece of F1 history.",
      deliveryNote: "Ships in premium collectors box. Free delivery on orders above ₹2,999."
    }
  },
  {
    id: "rb19",
    name: "RB19",
    tagline: "The most dominant car ever built.",
    season: "2023",
    chassis: "RB19 Monocoque Carbon Fibre",
    engine: "Honda RBPTH001e 1.6L V6 Hybrid",
    themeColor: "#FFD700",
    accentColor: "#E4002B",
    gradient: "linear-gradient(135deg, #1A1A2E 0%, #2D1B00 50%, #3D2800 100%)",
    folderPath: "/images/f1",
    stats: [
      { label: "Top Speed", value: "358", unit: "km/h" },
      { label: "Race Wins", value: "21", unit: "/23" },
      { label: "Downforce", value: "3200", unit: "N" },
      { label: "Weight", value: "798", unit: "kg" }
    ],
    driverPair: [
      { name: "Max Verstappen", number: "1", nationality: "NED" },
      { name: "Sergio Perez", number: "11", nationality: "MEX" }
    ],
    section1: { headline: "RB19.", sub: "Rewriting records." },
    section2: { headline: "21 wins from 23 races.", sub: "The most statistically dominant Formula 1 car in the modern era. No car has come close." },
    section3: { headline: "Aero perfection.", sub: "Outwash concept and a revolutionary floor geometry that competitors spent the season decoding." },
    section4: { headline: "History, crystallised.", sub: "" },
    storySection: {
      title: "The Record Breaker",
      body: "The RB19 shattered every metric of dominance. 21 victories from 23 starts. A Constructors margin that made rivals irrelevant before summer. Chief Technical Officer Adrian Newey's last masterwork at Red Bull, the RB19's outwash aerodynamics generated outrageously consistent downforce, lap after lap, on every circuit — wet, dry, hot, cold. It is, statistically, the greatest Formula 1 car ever constructed."
    },
    techSection: {
      title: "The Outwash Philosophy",
      body: "Where competitors channelled air inboard, Red Bull's engineers did the opposite. The RB19's radical outwash concept pushed turbulent air away from the critical floor edges, keeping the venturi tunnels clean and maximally effective. Combined with an exceptionally stiff chassis and precise weight distribution, the car produced impossible corner speeds in all conditions.",
      specHighlights: ["Outwash Aerodynamic Concept", "Record-Low Drag Coefficient", "Best-in-Class Tyre Life", "Adaptive Ride Height System"]
    },
    achievements: [
      { label: "Race Wins", value: "21/23" },
      { label: "Constructors", value: "By 453pts" },
      { label: "Drivers Title", value: "Max #3" },
      { label: "Pole Positions", value: "12" }
    ],
    ctaSection: {
      price: "₹3,999",
      unit: "Official Scale Model 1:18",
      tagline: "The car that broke Formula 1.",
      deliveryNote: "Limited edition packaging. Certificate of authenticity included."
    }
  },
  {
    id: "rb18",
    name: "RB18",
    tagline: "Ground effect. Reborn.",
    season: "2022",
    chassis: "RB18 Monocoque Carbon Fibre",
    engine: "Honda RBPTH001 1.6L V6 Hybrid",
    themeColor: "#0091FF",
    accentColor: "#FFD700",
    gradient: "linear-gradient(135deg, #0A0A1A 0%, #001A3A 50%, #002855 100%)",
    folderPath: "/images/f1",
    stats: [
      { label: "Top Speed", value: "351", unit: "km/h" },
      { label: "Wheelbase", value: "3600", unit: "mm" },
      { label: "Downforce", value: "2900", unit: "N" },
      { label: "Weight", value: "798", unit: "kg" }
    ],
    driverPair: [
      { name: "Max Verstappen", number: "1", nationality: "NED" },
      { name: "Sergio Perez", number: "11", nationality: "MEX" }
    ],
    section1: { headline: "RB18.", sub: "Ground effect reborn." },
    section2: { headline: "New era. First winners.", sub: "F1's most radical regulation reset in a generation. Red Bull cracked the code before anyone else." },
    section3: { headline: "Floor-generated downforce.", sub: "Massive Venturi tunnels carved into the underfloor, harnessing ground effect aerodynamics at 300+ km/h." },
    section4: { headline: "Era-defining, season one.", sub: "" },
    storySection: {
      title: "Decoding the Ground Effect Era",
      body: "When F1 introduced its most ambitious regulation overhaul in 40 years, Red Bull's engineers had already solved the puzzle. The RB18 was the first car to fully harness the potential of the new ground effect rules — its underfloor venturi channels generating massive downforce loads independently of the sensitive outer bodywork. The result was a car that simply worked, everywhere, all season long."
    },
    techSection: {
      title: "Venturi Architecture",
      body: "The heart of the RB18 was its underfloor. Two vast tunnels channel air at speed, creating a low-pressure zone beneath the car. Physics pulls the car toward the track with forces proportional to the square of velocity — the faster you go, the harder you are pressed down. Red Bull's mastery of porpoising control and ride height optimisation unlocked 2900N of downforce while competitors struggled with bouncing.",
      specHighlights: ["Ground Effect Venturi Tunnels", "Anti-Porpoising Suspension", "Push-Rod Rear Suspension", "Carbon Fibre Floor Assembly"]
    },
    achievements: [
      { label: "Race Wins", value: "17/22" },
      { label: "Constructors", value: "Champions" },
      { label: "Drivers Title", value: "Max #2" },
      { label: "1-2 Finishes", value: "7" }
    ],
    ctaSection: {
      price: "₹3,499",
      unit: "Official Scale Model 1:18",
      tagline: "The car that started a dynasty.",
      deliveryNote: "Handcrafted diecast. Ships within 5–7 business days."
    }
  }
];
