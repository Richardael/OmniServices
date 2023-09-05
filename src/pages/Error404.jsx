import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
<section className="flex items-center h-full p-16">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
			<h2 className="mb-8 font-extrabold text-9xl">
				<span className="sr-only">Error</span>404
			</h2>
			<p className="text-2xl font-semibold md:text-3xl">Lo Siento esta pagina no existe</p>
			<p className="mt-4 mb-8 dark:text-gray-400">Pero no te preocupes, ¡Puedes voler a la pagina de inicio!</p>
			<Link to="/" className="px-4 py-2 font-semibold text-secondary-200 transition-colors duration-200 transform bg-primary-300 rounded-md hover:bg-primary-200 focus:outline-none focus:bg-primary-200">Volver a la pagina de inicio</Link>
		</div>
	</div>
</section>
  )
}

export default Error404