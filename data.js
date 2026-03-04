/**
 * data.js — Single source of truth for all page content.
 * Import this before script.js in index.html.
 */

const SITE_DATA = {

    /* ── Product ────────────────────────────────────────── */
    product: {
        breadcrumb: ['Products', 'Two For One Twister'],
        certifications: [
            { icon: './assets/icons/BIS.svg', label: 'BIS Certified' },
            { icon: './assets/icons/ISO.svg', label: 'ISO Certified' },
            { icon: './assets/icons/CE.svg', label: 'CE Certified' },
        ],
        title: 'Premium HDPE Pipes & Coils for Modern Infrastructure',
        features: [
            'Leak-Proof Fusion Joints',
            'Chemical Resistance',
            '50+ Year Service Life',
            'Flexible Installation Options',
            'Easy Butt-Fusion Welding',
        ],
        price: { min: '4,80,000', max: '7,90,000', currency: '₹' },
        shipping: 'Shipping: 6-12 days',
        returns: 'Returns: If returned within 7 days',
        certText: 'ISO Certified, BIS Certified',
        /** All gallery images — add more paths here when available */
        images: [
            './assets/images/productImage.jpg',
            './assets/images/warehouse.jpg',
            './assets/images/productImage.jpg',
            './assets/images/engineers.jpg',
            './assets/images/productImage.jpg',
            './assets/images/warehouse.jpg',
        ],
    },

    /* ── Technical Specifications ───────────────────────── */
    specs: [
        { param: 'Pipe Diameter Range', value: '20 mm to 1600 mm (¾″ to 63″)' },
        { param: 'Pressure Ratings', value: 'PN 2.5, PN 4, PN 6, PN 8, PN 10, PN 12.5, PN 16' },
        { param: 'Standard Dimension Ratio', value: 'SDR 33, SDR 26, SDR 21, SDR 17, SDR 13.6, SDR 11' },
        { param: 'Operating Temperature', value: '-40 °C to +80 °C (-40 °F to +176 °F)' },
        { param: 'Service Life', value: '50+ Years (at 20 °C, PN 10)' },
        { param: 'Material Density', value: '0.95 – 0.96 g/cm³' },
        { param: 'Certification Standards', value: 'IS 5984, ISO 4427, ASTM D3035' },
        { param: 'Joint Type', value: 'Butt Fusion, Electrofusion, Mechanical' },
        { param: 'Coil Lengths', value: 'Up to 500 m (for smaller diameters)' },
        { param: 'Country of Origin', value: '🇮🇳 India' },
    ],

    /* ── Benefits ───────────────────────────────────────── */
    benefits: [
        {
            icon: './assets/icons/Bag.svg',
            title: 'Superior Chemical Resistance',
            desc: 'HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won\'t corrode, rust, or scale, ensuring pure water quality and extended service life.',
        },
        {
            icon: './assets/icons/Needle.svg',
            title: 'Exceptional Flexibility & Durability',
            desc: 'High-density polyethylene flexes without fracturing. Even in seismic or vibration-prone environments HDPE absorbs stress that would crack rigid pipe materials.',
        },
        {
            icon: './assets/icons/Package.svg',
            title: 'Leak-Proof Fusion Welding',
            desc: 'Butt-fusion joints create monolithic, homogeneous seams stronger than the pipe body itself — zero gaskets, zero clamps, zero long-term leak risk.',
        },
        {
            icon: './assets/icons/GearFine.svg',
            title: 'Cost-Effective Long-Term Solution',
            desc: 'Minimal maintenance, 50+ year service life, and quick installation make HDPE the most economical choice when total cost of ownership is considered.',
        },
        {
            icon: './assets/icons/GearFine.svg',
            title: 'Environmentally Sustainable',
            desc: '100 % recyclable material, low carbon manufacturing footprint, and zero ground-water contamination make HDPE the responsible choice.',
        },
        {
            icon: './assets/icons/GearFine.svg',
            title: 'Certified Quality Assurance',
            desc: 'Every batch is tested against IS 5984, ISO 4427, and ASTM D3035 standards — certificates available on request for all domestic and export orders.',
        },
    ],

    /* ── FAQ ────────────────────────────────────────────── */
    faq: [
        {
            q: 'What is the purpose of a laser cutter for sheet metal?',
            a: 'It is designed to cut various types of sheet metal with precision, allowing for intricate designs and shapes that are essential in modern manufacturing processes.',
            open: true,
        },
        {
            q: 'What are the benefits of using HDPE pipes in water supply networks?',
            a: 'HDPE pipes offer leak-proof joints, high chemical resistance, low hydraulic friction, and a service life exceeding 50 years — making them ideal for pressurised water mains.',
        },
        {
            q: 'How is HDPE pipe produced?',
            a: 'Raw PE100 compound is melted in a single-screw extruder, formed through a precision die, cooled in vacuum-calibration baths, inspected, marked, cut, and packaged.',
        },
        {
            q: 'What are the common applications of HDPE pipes?',
            a: 'Water supply, gas distribution, industrial effluents, bore-well casing, sub-surface drainage, irrigation, and submarine / directional-drilling projects.',
        },
        {
            q: 'Can HDPE pipes be customised to specific dimensions?',
            a: 'Yes — we manufacture diameters from 20 mm to 1600 mm and can produce custom SDR ratios, colours, and coil lengths to project specifications.',
        },
    ],

    /* ── Applications Carousel ──────────────────────────── */
    applications: [
        {
            image: './assets/images/productImage.jpg',
            title: 'Fishnet Manufacturing',
            desc: 'High-performance twisting solutions delivering durable nets for offshore and inland fisheries.',
        },
        {
            image: './assets/images/productImage.jpg',
            title: 'Agricultural Irrigation',
            desc: 'Pressure-rated coils designed for drip and sprinkler irrigation across large farming estates.',
        },
        {
            image: './assets/images/productImage.jpg',
            title: 'Municipal Water Supply',
            desc: 'Long-run, leak-free water mains for urban and rural potable-water distribution networks.',
        },
        {
            image: './assets/images/productImage.jpg',
            title: 'Industrial Effluent Lines',
            desc: 'Chemical-resistant piping carrying acids, alkalis, and industrial waste safely to treatment plants.',
        },
        {
            image: './assets/images/productImage.jpg',
            title: 'Gas Distribution',
            desc: 'PE100 RC pipes approved for medium-pressure gas networks with superior impact resistance.',
        },
        {
            image: './assets/images/productImage.jpg',
            title: 'Submarine Pipelines',
            desc: 'Weighted HDPE bundles for submarine outfalls, desalination intakes, and dredging applications.',
        },
    ],

    /* ── Manufacturing Process Steps ───────────────────── */
    processSteps: [
        {
            name: 'Raw Material',
            title: 'High-Grade Raw Material Selection',
            desc: 'Only PE100 virgin compound meeting MRS 10.0 MPa requirements is accepted, with full batch traceability from resin producer to finished pipe.',
            bullets: ['PE100 grade material', 'Optimal molecular weight distribution'],
            image: './assets/images/productImage.jpg',
        },
        {
            name: 'Extrusion',
            title: 'Single-Screw Extrusion Process',
            desc: 'Precision temperature-controlled barrel zones melt and homogenise the HDPE compound before it is shaped through a precision annular die.',
            bullets: ['Temperature-controlled barrel zones', 'Consistent melt-pressure monitoring'],
            image: './assets/images/productImage.jpg',
        },
        {
            name: 'Cooling',
            title: 'Controlled Water-Bath Cooling',
            desc: 'A multi-stage vacuum-calibration and water-bath system rapidly cools the pipe, locking in the correct crystalline structure and OD dimensions.',
            bullets: ['Multiple cooling stages', 'Vacuum calibration for roundness'],
            image: './assets/images/productImage.jpg',
        },
        {
            name: 'Sizing',
            title: 'Precision Diameter Sizing',
            desc: 'Vacuum sizing tanks ensure precise outer diameter tolerance of ±0.1 mm while internal pressure maintains perfect roundness and wall uniformity.',
            bullets: ['Tolerance ±0.1 mm on OD', 'Automated diameter monitoring'],
            image: './assets/images/productImage.jpg',
        },
        {
            name: 'Quality Control',
            title: 'Rigorous Quality Inspection',
            desc: 'Every pipe batch undergoes hydrostatic pressure testing, wall-thickness scanning, and visual inspection before release to dispatch.',
            bullets: ['Hydrostatic pressure testing', 'Ultrasonic wall-thickness scanning'],
            image: './assets/images/productImage.jpg',
        },
        {
            name: 'Marking',
            title: 'Continuous Ink-Jet Marking',
            desc: 'Permanent legible markings are applied including product grade, OD, pressure rating, applicable standard, and manufacturer traceability code.',
            bullets: ['ISO & IS standard codes', 'Date-stamp and batch number'],
            image: './assets/images/productImage.jpg',
        },
        {
            name: 'Cutting',
            title: 'Precision Automatic Cutting',
            desc: 'CNC-controlled planetary saws cut pipes to ordered lengths with clean, burr-free square ends ready for butt-fusion or delivery.',
            bullets: ['Automatic length control', 'Burr-free square cut ends'],
            image: './assets/images/productImage.jpg',
        },
        {
            name: 'Packaging',
            title: 'Protective Packaging & Bundling',
            desc: 'Coils are stretch-wrapped and bundles are polyester-strapped with clear identification labels for safe transit and site handling.',
            bullets: ['UV-stabilised wrap for export', 'Clear batch-traceable labels'],
            image: './assets/images/productImage.jpg',
        },
    ],

    /* ── Feedback / Testimonials ────────────────────────── */
    feedback: [
        {
            text: 'Mangalam\'s HDPE pipes arrived on time and passed every hydrostatic test first go. The quality is consistent batch after batch — exactly what large infrastructure projects demand.',
            name: 'Rajesh Kumar',
            role: 'Project Director, NRL Infrastructure Pvt. Ltd.',
            rating: 5,
        },
        {
            text: 'We switched from steel pipes to Mangalam HDPE three seasons ago. Zero leaks, zero corrosion — our maintenance costs dropped 60 % within the first year.',
            name: 'Priya Venkat',
            role: 'Chief Engineer, KrishnaIrri Agro',
            rating: 5,
        },
        {
            text: 'Responsive team, custom SDR ratios delivered within the agreed lead time. The technical data sheets are thorough and helped us clear local authority approvals quickly.',
            name: 'Mohammed Al-Rashid',
            role: 'Procurement Manager, Gulf Waterworks LLC',
            rating: 5,
        },
        {
            text: 'Excellent fusion-grade consistency across the 25 km coil lengths we used for the submarine outfall. No de-lamination and dimensional tolerance was spot on throughout.',
            name: 'Anita Sharma',
            role: 'Site Manager, CoastalBuild EPC',
            rating: 5,
        },
    ],

    /* ── Solutions / Related Products ─────────────────── */
    solutions: [
        {
            image: './assets/images/productImage.jpg',
            title: 'HDPE Pipe Fittings',
            desc: 'Elbows, tees, reducers, and end-caps — all manufactured from PE100 compound for leak-proof butt-fusion joining.',
        },
        {
            image: './assets/images/productImage.jpg',
            title: 'Electrofusion Couplings',
            desc: 'Precision-wound resistance-wire couplings for buried and trenchless directional-drilling applications.',
        },
        {
            image: './assets/images/productImage.jpg',
            title: 'HDPE Coil Pipes',
            desc: 'Continuous coils up to 500 m for drip irrigation and rural water supply with minimal jointing.',
        },
    ],

    /* ── Resources / Downloads ──────────────────────────── */
    resources: [
        { name: 'HDPE Pipe Installation Manual (PDF)', file: '#' },
        { name: 'Maintenance & Inspection Handbook (PDF)', file: '#' },
        { name: 'Engineering Specifications Sheet (PDF)', file: '#' },
    ],
};
