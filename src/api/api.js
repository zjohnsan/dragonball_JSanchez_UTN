export async function Consultar(){
    const consulta = await fetch(import.meta.env.VITE_URL)
    console.log(import.meta.env.VITE_URL);
    
    const {items} = await consulta.json()
    return items ?? []
}