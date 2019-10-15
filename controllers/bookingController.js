require('dotenv').config();

module.exports.makeBooking = async (req, res) => {
    try {
        let user = req.user._id;
        let { car, issueDate, returnDate } = req.body;
        let carRentPerDay = await Car.findOne({_id: car});
        carRentPerDay = carRentPerDay.rentPerDay;
        let timeDiff = new Date(returnDate).getTime() - new Date(issueDate).getTime();
        let days = timeDiff / (1000 * 3600 * 24);
        let booking = new Booking({
            user, car, issueDate, returnDate, totalRent: days * carRentPerDay
        });
        await booking.save();
        await Car.updateOne({ _id: car }, { available: false });
        return res.status(200).json({
            message: 'car booked'
        });
    } catch(err) {
        return res.status(408).json({
            message: err.message
        });
    }
};