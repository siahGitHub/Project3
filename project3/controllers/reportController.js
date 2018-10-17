var fastCsv = require('fast-csv');
const db = require("../models");


module.exports = {
    getRecipientReport: function (req, res) {

        const cursor = db.Recipient.find();

        const transformer = (doc) => {
            return {
                'First Name': doc.firstName,
                'Last Name': doc.lastName,
                Age: doc.age,
                Gender: doc.gender,
                Grade: doc.schoolGrade,
                Color: doc.favoriteColor
            };
        }

        const filename = 'recipients-export.csv';

        res.setHeader('Content-disposition', `attachment; filename=${filename}`);
        res.writeHead(200, { 'Content-Type': 'text/csv' });

        res.flushHeaders();

        var csvStream = fastCsv.createWriteStream({ headers: true }).transform(transformer)
        cursor.stream().pipe(csvStream).pipe(res);
    },
    getItemsReport: function (req, res) {

        const cursor = db.RecipientItems.find();

        const transformer = (doc) => {
            return {
                Article: doc.article,
                Size: doc.size,
                Donated: doc.donated,
                Incorrect: doc.incorrect,
                Status: doc.status,
                'Recipient ID': doc.recipient
            };
        }

        const filename = 'items-export.csv';

        res.setHeader('Content-disposition', `attachment; filename=${filename}`);
        res.writeHead(200, { 'Content-Type': 'text/csv' });

        res.flushHeaders();

        var csvStream = fastCsv.createWriteStream({ headers: true }).transform(transformer)
        cursor.stream().pipe(csvStream).pipe(res);
    }
};