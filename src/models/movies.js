const model = {}
const db = require('../config/db')
const fs = require('fs')

model.InsertMoviesData = async (data) => {
  try {
    await db.query(
      'INSERT INTO public.movies (movie_name, category, director, casts, release_date, duration_hour, duration_min, synopsis, images) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [
        data.movie_name,
        data.category,
        data.director,
        data.casts,
        data.release_date,
        data.duration_hour,
        data.duration_min,
        data.synopsis,
        data.images
      ]
    )
    return 'Insert movie succesfully'
  } catch (error) {
    return error
  }
}

model.GetMoviesData = async () => {
  try {
    const results = await db.query(
      'SELECT * FROM public.movies ORDER BY id_movie DESC'
    )
    return results.rows
  } catch (error) {
    return error
  }
}

model.SortMoviesData = async () => {
  try {
    const results = await db.query(
      'SELECT * FROM public.movies ORDER BY movie_name ASC, release_date DESC'
    )
    return results.rows
  } catch (error) {
    return error
  }
}

model.GetMoviesDataById = async (data) => {
  try {
    const results = await db.query(
      'SELECT * FROM public.movies WHERE id_movie=$1',
      [data.id_movie]
    )
    return results.rows
  } catch (error) {
    return error
  }
}

model.FindMoviesData = async (data) => {
  try {
    const results = await db.query(
      'SELECT * FROM public.movies WHERE LOWER(movie_name) LIKE LOWER($1)',
      [`%${data.movie_name}%`]
    )
    return results.rows
  } catch (error) {
    return error
  }
}

model.UpdateMoviesData = async (data) => {
  try {
    const movie = await db.query(
      'SELECT * FROM public.movies WHERE id_movie=$1',
      [data.id_movie]
    )
    // filesystem(unlink) untuk menghapus img berdasarkan path img
    const image = movie.rows[0].images.split('http://localhost:8080/')[1]
    fs.unlink(image, (err) => {
      if (err) throw err
    })
    await db.query(
      `UPDATE public.movies
        SET 
        movie_name = COALESCE(NULLIF($1, ''), movie_name),
        category = COALESCE(NULLIF($2, ''), "category"),
        director = COALESCE(NULLIF($3, ''), director),
        casts = COALESCE(NULLIF($4, ''), casts),
        release_date = COALESCE(NULLIF($5, CURRENT_DATE), release_date),
        duration_hour = COALESCE(NULLIF($6, 0), duration_hour),
        duration_min = COALESCE(NULLIF($7, 0), duration_min),
        synopsis = COALESCE(NULLIF($8, ''), synopsis),
        images = COALESCE(NULLIF($9, ''), images)
        WHERE id_movie = $10
        RETURNING *`,
      [
        data.movie_name,
        data.category,
        data.director,
        data.casts,
        data.release_date,
        data.duration_hour,
        data.duration_min,
        data.synopsis,
        data.images,
        data.id_movie
      ]
    )
    return 'Update movie successfully'
  } catch (error) {
    return error
  }
}

model.DeleteMoviesData = async (data) => {
  try {
    const movie = await db.query(
      'SELECT * FROM public.movies WHERE id_movie=$1',
      [data.id_movie]
    )

    // filesystem(unlink) untuk menghapus img berdasarkan path img
    const image = movie.rows[0].images.split('http://localhost:8080/')[1]
    fs.unlink(image, (err) => {
      if (err) throw err
    })

    await db.query('DELETE FROM public.movies WHERE id_movie=$1', [
      data.id_movie
    ])
    return 'Movie has been deleted'
  } catch (error) {
    return error
  }
}

module.exports = model
