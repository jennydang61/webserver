const db = require("../config/dbConn"); // Use the correct database connection

const add = (reviewer_ID, reviewed_ID, rate, comment) => {
    const query = `
        INSERT INTO Review (reviewer_ID, reviewed_ID, rate, date_added, comment)
        VALUES (?, ?, ?, CURRENT_DATE, ?);
    `;
    console.log("Executing Query:", query);
    return db.promise().execute(query, [reviewer_ID, reviewed_ID, rate, comment]);
};

const getAll = (user_ID) => {
    const query = `
        SELECT r.review_ID, r.rate, r.comment, r.date_added, u.name AS reviewer_name
        FROM Review r
        JOIN User u ON r.reviewer_ID = u.user_ID
        WHERE r.reviewed_ID = ?;
    `;
    return db.execute(query, [user_ID]);
};

module.exports = { add, getAll };
