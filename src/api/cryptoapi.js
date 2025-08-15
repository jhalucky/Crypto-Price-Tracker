export const fetchCryptoData = async(coinIds = "bitcoin,ethereum,solana") => {
    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}`);
        return await res.json();
    } catch (error) {
        console.error("Error fetching crypto data: ",error);
        return null;
    }
    
}