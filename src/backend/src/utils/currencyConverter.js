import config from '#src/config/config'

const getRate = (toCurrency, fromCurrency = config.currency.VND) => {
    switch (toCurrency) {
        case (config.currency.USD): return (1 / 23000);
        case (config.currency.VND): return (1 / 1);
    }
}

export { getRate }