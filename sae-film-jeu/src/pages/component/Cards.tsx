import '../../index.css'

function Cards() {
  return (
// Remplacer l'intégralité du bloc par celui-ci :
<div className='relative w-32 h-44 md:w-44 md:h-64 border rounded-2xl overflow-hidden group select-none cursor-grab active:cursor-grabbing transform-gpu'>
    <img 
        src="https://image.tmdb.org/t/p/original/vTIBjWMWx1p5Wv2J3IRhEW13lrj.jpg" 
        alt="" 
        // pointer-events-none évite que le navigateur essaie de drag uniquement l'image HTML par défaut
        className='w-full h-full object-cover pointer-events-none' 
    />
    <div className='absolute bottom-0 left-0 w-full pt-20 pb-4 px-1 bg-gradient-to-t from-black/90 via-black/70 to-transparent pointer-events-none'>
        <p className='text-white text-xs md:text-sm font-medium text-center line-clamp-2'>
            Le diable s'habille en prada
        </p>
    </div>
</div>
  )
}

export default Cards
