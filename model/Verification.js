const { lastDayOfWeek } = require("date-fns");
const db = require("../config/dbConn");

module.exports = class Verification {
  constructor() {}

  static async fetchAllUnverified() {
    return await db.execute(
      `SELECT * FROM User JOIN Verification ON User.user_ID = Verification.student_ID JOIN Status ON Verification.status_ID = Status.status_ID WHERE Status.status_name = 'Pending'`,
      []
    );
  }

  static async check(user_ID) {
    return await db.execute(
      `SELECT Status.status_name
      FROM User
      JOIN Verification ON User.user_ID = Verification.student_ID
      JOIN Status ON Verification.status_ID = Status.status_ID
      WHERE User.user_ID = ?;
      `,
      [user_ID]
    );
  }

  static async updateVerification(admin_ID, student_ID, status_name) {
    var datetime = new Date();
    const datetime_str = datetime.toISOString().slice(0, 10);

    await db.execute(
      `
      UPDATE Verification
      SET admin_ID = ?, verified_date = ?
      WHERE student_ID = ?;
      `,
      [admin_ID, datetime_str, student_ID]
    );
    console.log("Verification admin_ID and date updated."); // devel

    // fetch status_ID from the verification
    const [[status]] = await db.execute(
      `
      SELECT status_ID FROM Verification WHERE student_ID = ?
      `,
      [student_ID]
    );
    console.log(status.status_ID);

    await db.execute(
      `
      UPDATE Status 
      SET status_name = ?, last_updated = ?
      WHERE status_ID = ?;
      `,
      [status_name, datetime_str, status.status_ID]
    );

    // if accepted, add to Accepted table; otherwise, add to Declined table
    status_name === "Accepted"
      ? await db.execute(
          `
          INSERT INTO Accepted (status_id, accepted_by)
          VALUES (?,?);
          `,
          [status.status_ID, admin_ID]
        )
      : await db.execute(
          `
          INSERT INTO Declined (status_id, declined_by)
          VALUES (?,?);
          `,
          [status.status_ID, admin_ID]
        );

    return true;
  }

  static async updateStatus(admin_ID, student_ID, status_name) {
    // update the status of the verification

    const [[status_ID]] = await db.execute(
      `SELECT status_ID FROM Verification WHERE student_ID = ?`,
      [student_ID]
    );
    console.log(status_ID);
    var datetime = new Date();
    const datetime_str = datetime.toISOString().slice(0, 10);

    await db.execute(
      `
      UPDATE Status 
      SET status_name = ?, last_updated = ?
      WHERE status_ID = ?;
      `,
      [status_name, datetime_str, status_ID]
    );

    // if accepted, add to Accepted table
    status_name === "Accepted"
      ? await db.execute(
          `
      INSERT INTO Accepted (status_id, accepted_by)
      VALUES (?,?);
      `,
          [status_ID, admin_ID]
        )
      : await db.execute(
          `
      INSERT INTO Declined (status_id, accepted_by)
      VALUES (?,?);
      `,
          [status_ID, admin_ID]
        );

    console.log("Verification status updated successfully"); // devel

    return true;
  }
};
