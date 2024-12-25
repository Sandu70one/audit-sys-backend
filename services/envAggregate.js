const { db } = require("../firebase");
const { collection, query, getDocs, orderBy, limit } = require("firebase/firestore");

const fetchData = async () => {
  try {
    // Query for documents ordered by createdAt and limit to top 3
    const q = query(
      collection(db, "powerData"),
      orderBy("createdAt"),
      limit(1)
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => doc.data());

    if (data.length === 0) {
      console.log("No documents found.");
    } else {
      console.log(data);
    }

    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

module.exports = fetchData;
