// Supabase Configuration
// Provided by user: sb_publishable_S2NPUaB97QTpTiGOAZbHpg_nshWPvrJ
// URL provided by user: https://xukucposrukrskghnhfo.supabase.co

const supabaseUrl = 'https://xukucposrukrskghnhfo.supabase.co';
const supabaseKey = 'sb_publishable_S2NPUaB97QTpTiGOAZbHpg_nshWPvrJ';

// Note: To use this in the browser, you typically need the Supabase CDN script:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

let supabase = null;

if (typeof supabase !== 'undefined' && window.supabase) {
    supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
    console.log('Supabase initialized successfully.');
} else {
    console.warn('Supabase JS library not found. Please include <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script> in your HTML.');
}

window.db = supabase; // Export to global scope as 'db' for convenience
