const db = require("../config/dbConn");

const statusQuery = `
  INSERT INTO Status (status_context, status_name, description, created_date, last_updated)
  VALUES ('Roommate Request', 'Pending', ?, CURRENT_DATE, CURRENT_DATE)
`;

const roommateRequestQuery = `
  INSERT INTO RoommateRequest (receiver_ID, sender_ID, status_ID, sender_name)
  VALUES (?, ?, ?, ?)
`;

const acceptStatusUpdateQuery = `
  UPDATE Status
  SET status_name = 'Accepted', last_updated = CURRENT_DATE
  WHERE status_ID = ?
`;

const declineStatusUpdateQuery = `
  UPDATE Status
  SET status_name = 'Declined', last_updated = CURRENT_DATE
  WHERE status_ID = ?
`;

const acceptedQuery = `
  INSERT INTO Accepted (status_ID, accepted_by)
  VALUES (?, ?)
`;

const declinedQuery = `
  INSERT INTO Declined (status_ID, declined_by)
  VALUES (?, ?)
`;

const fetchStatusQuery = `
SELECT RR.status_ID, S.status_name
FROM RoommateRequest AS RR
NATURAL JOIN Status AS S
WHERE RR.status_ID = S.status_ID
AND RR.receiver_ID = ?;
`;

module.exports = class RoommateRequest {
  constructor() {}

  static async addRequest(receiver_ID, sender_ID, sender_name, description) {
    try {
        const [statusResult] = await db.execute(statusQuery, [description]);
        console.log("Status Inserted:", statusResult); // Debugging line
        const status_ID = statusResult.insertId;

        await db.execute(roommateRequestQuery, [
            receiver_ID,
            sender_ID,
            status_ID,
            sender_name,
        ]);
        console.log("Roommate Request Inserted"); // Debugging line

        return status_ID;
    } catch (error) {
        console.error("Error in addRequest:", error); // Debugging line
        throw new Error("Failed to add roommate request.");
    }
}

static async acceptRequest(receiver_ID, accepted_by) {
    try {
        if (!receiver_ID || !accepted_by) {
            throw new Error("Missing required fields: receiver_ID or accepted_by");
        }

        console.log("receiver_ID:", receiver_ID, "accepted_by:", accepted_by);

        const [result] = await db.execute(fetchStatusQuery, [receiver_ID]);

        if (!result.length) {
            throw new Error("No request found for the given receiver_ID");
        }

        const status_ID = result[0].status_ID;

        await db.execute(acceptStatusUpdateQuery, [status_ID]);

        await db.execute(acceptedQuery, [status_ID, accepted_by]);

        return status_ID;
    } catch (error) {
        console.error("acceptRequest error:", error);
        throw new Error("Failed to accept request.");
    }
}


  static async declineRequest(receiver_ID, declined_by) {
    try {
        if (!receiver_ID || !declined_by) {
            throw new Error("Missing required fields: receiver_ID or declined_by");
        }

        console.log("receiver_ID:", receiver_ID, "declined_by:", declined_by);

        const [result] = await db.execute(fetchStatusQuery, [receiver_ID]);

        if (!result.length) {
            throw new Error("No request found for the given receiver_ID");
        }

        const status_ID = result[0].status_ID;

        await db.execute(declineStatusUpdateQuery, [status_ID]);

        await db.execute(declinedQuery, [status_ID, declined_by]);

        return status_ID;
    } catch (error) {
        console.error("declineRequest error:", error);
        throw new Error("Failed to decline request.");
    }
  }

  static async fetchStatus(receiver_ID) {
    try {
      const [results] = await db.execute(fetchStatusQuery, [receiver_ID]);
      return results;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch status.");
    }
  }
};

/* {
  "receiver_ID": 93, 
  "sender_ID": 94,  
  "sender_name": "Student Name", 
  "description": "Test"

  {
  "receiver_ID": 94,
  "declined_by": 94
}

{
  "receiver_ID": 94,
  "accepted_by": 94
}

http://localhost:3500/request/status?receiver_ID=94&sender_ID=93
} */