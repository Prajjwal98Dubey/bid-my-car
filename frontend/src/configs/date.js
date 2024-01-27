// Tue, Jan 30 12:00 AM
// const s ="2024-01-26T02:57"

export const formatDate=(s)=>{
    const firstHalf = s.split("T")[0]
    const secondHalf = s.split("T")[1]
    let time
    if (secondHalf.split(":")[0] >12){
        time = secondHalf.split(":")[0] -12
    }
    
    
}
