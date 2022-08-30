const model = {}
const db = require('../config/db')

model.InsertScheduleData = async (data) => {
  try {
    await db.query(
      'INSERT INTO public.schedule (movie, price, premiere, "location", date_start, date_end, "time") VALUES($1, $2, $3, $4, $5, $6, $7)',
      [
        data.movie,
        data.price,
        data.premiere,
        data.location,
        data.date_start,
        data.date_end,
        data.time
      ]
    )
    return 'Insert schedule succesfully'
  } catch (error) {
    return error
  }
}

model.GetScheduleData = async () => {
  try {
    const results = await db.query(
      'SELECT * FROM public.schedule ORDER BY id_schedule DESC'
    )
    return results.rows
  } catch (error) {
    return error
  }
}

model.GetScheduleDataById = async (data) => {
  try {
    const results = await db.query(
      'SELECT * FROM public.schedule WHERE id_schedule=$1',
      [data.id_schedule]
    )
    return results.rows
  } catch (error) {
    return error
  }
}

model.UpdateScheduleData = async (data) => {
  try {
    await db.query(
      `UPDATE public.schedule
        SET movie = COALESCE(NULLIF($1, ''), movie),
            price = COALESCE(NULLIF($2, 0.0), price),
            premiere = COALESCE(NULLIF($3, ''), premiere),
            location = COALESCE(NULLIF($4, ''), location),
            date_start = COALESCE(NULLIF($5, CURRENT_DATE), date_start),
            date_end = COALESCE(NULLIF($6, CURRENT_DATE), date_end),
            time = COALESCE(NULLIF($7, CURRENT_TIME), time)
            WHERE id_schedule = $8
            RETURNING *`,
      [
        data.movie,
        data.price,
        data.premiere,
        data.location,
        data.date_start,
        data.date_end,
        data.time,
        data.id_schedule
      ]
    )
    return 'Update schedule successfully'
  } catch (error) {
    return error
  }
}

model.DeleteScheduleData = async (data) => {
  try {
    await db.query('DELETE FROM public.schedule WHERE id_schedule=$1', [
      data.id_schedule
    ])
    return 'Schedule has been deleted'
  } catch (error) {
    return error
  }
}

module.exports = model
