const SUPABASE_PROJECT_URL = process.env.SUPABASE_PROJECT_URL;

async function keepAlive() {
  try {
    const response = await fetch(`${SUPABASE_PROJECT_URL}/rest/v1/`, {
      method: "HEAD",
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY,
      },
    });
    console.log(`Ping status: ${response.status}`);
  } catch (error) {
    console.error("Error pinging Supabase:", error);
  }
}

// Run every 5 minutes
setInterval(keepAlive, 5 * 60 * 1000);

// Initial run
keepAlive();
