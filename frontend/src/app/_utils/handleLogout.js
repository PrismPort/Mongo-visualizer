export const handleLogout = async (res) => {
  await fetch(
    "http://localhost:4000/disconnect-mongodb", // Consider updating this URL for production
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log(res);
};
