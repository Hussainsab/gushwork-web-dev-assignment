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
};
