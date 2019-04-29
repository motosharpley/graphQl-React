const Event = require('../../models/event');
const Booking = require('../../models/booking');
const { tranformBooking, transformEvent } = require('./merge');


module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return tranformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async args => {
    const fetchedEvent = await Event.findOne({_id: args.eventId})
    const booking = new Booking({
      user: '5cb4b974b10a9132940d2dd1',
      event: fetchedEvent
    });
    const result = await booking.save();
    return tranformBooking(result);
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId).populate('event');
      const event = transformEvent(booking.event);
      await Booking.deleteOne({_id: args.bookingId});
      return event;
    } catch (err) {
      throw err;
    }
  }
}