'use client'

type MovieCardProps = {
  title: string
  imageUrl: string
  description: string
}

export default function MovieCard({ title, imageUrl, description }: MovieCardProps) {
  return (
    <div className="relative w-48 m-2 rounded overflow-hidden hover:scale-105 transition-transform cursor-pointer shadow-lg">
  <img src={imageUrl} alt={title} className="w-full h-64 object-cover" />
  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 p-3 text-white flex flex-col justify-end transition-opacity cursor-pointer">
    <h3 className="font-bold">{title}</h3>
    <p className="text-sm">{description}</p>
  </div>
</div>

  )
}
