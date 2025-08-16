export const fetchCryptoData = async (page = 1) => {
    try {
        const res = await fetch(
            'https://api.coingecko.com/api/v3/coins/markets?' +
            new URLSearchParams({
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 250,
                page: page,
                sparkline: false,
                price_change_percentage: '24h,7d,30d'
            })
        );
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching crypto data:", error);
        throw error;
    }
}


export const fetchAllCryptoData = async (numberOfPages = 2) => {
    try {
        const promises = [];
        for (let page = 1; page <= numberOfPages; page++) {
            promises.push(fetchCryptoData(page));
        }
        
        const results = await Promise.all(promises);
        
        return results.flat();
    } catch (error) {
        console.error("Error fetching all crypto data:", error);
        throw error;
    }
}