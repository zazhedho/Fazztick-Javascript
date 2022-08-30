const model = {}
const db = require('../config/db')

model.InsertBookingData = async (data) => {
  try {
    await db.query(
      'INSERT INTO public.booking ("date", "time", movie_title, cinema_name, num_tickets, total_payment) VALUES($1, $2, $3, $4, $5, $6)',
      [
        data.date,
        data.time,
        data.movie_title,
        data.cinema_name,
        data.num_tickets,
        data.total_payment
      ]
    )
    return 'Insert data booking succesfully'
  } catch (error) {
    return error
  }
}

model.GetBookingData = async () => {
  try {
    const results = await db.query(
      'SELECT * FROM public.booking ORDER BY id_booking DESC'
    )
    return results.rows
  } catch (error) {
    return error
  }
}

model.GetBookingDataById = async (data) => {
  try {
    const results = await db.query(
      'SELECT * FROM public.booking WHERE id_booking=$1',
      [data.id_booking]
    )
    return results.rows
  } catch (error) {
    return error
  }
}

model.UpdateBookingData = async (data) => {
  try {
    await db.query(
      `UPDATE public.booking
        SET date = COALESCE(NULLIF($1, CURRENT_DATE), date),
            time = COALESCE(NULLIF($2, CURRENT_TIME), time),
            movie_title = COALESCE(NULLIF($3, ''), movie_title),
            cinema_name = COALESCE(NULLIF($4, ''), cinema_name),
            num_tickets = COALESCE(NULLIF($5, ''), num_tickets),
            total_payment = COALESCE(NULLIF($6, 0.0), total_payment)
            WHERE id_booking = $7
            RETURNING *`,
      [
        data.date,
        data.time,
        data.movie_title,
        data.cinema_name,
        data.num_tickets,
        data.total_payment,
        data.id_booking
      ]
    )
    return 'Update data booking successfully'
  } catch (error) {
    console.log(error)
    throw error
  }
}

model.DeleteBookingData = async (data) => {
  try {
    await db.query('DELETE FROM public.booking WHERE id_booking=$1', [
      data.id_booking
    ])
    return 'Data booking has been deleted'
  } catch (error) {
    return error
  }
}

module.exports = model
