const SUPABASE_REST_URL = "https://vdzadpgvbnopducnfxok.supabase.co/rest/v1";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkemFkcGd2Ym5vcGR1Y25meG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MTQ1ODIsImV4cCI6MjEwMTA5MDU4Mn0.QqSrvvcdniUPnx2c7kMWbRGSUaO8QKOxcdgd6qO_VVQ";

function supabaseHeaders(){
    return {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": "Bearer " + SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    };
}
