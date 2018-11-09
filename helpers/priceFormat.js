export const upOrDownSymbol = x => (x > 0 ? '▲' : '▼')

export const formatPercentage = x => (x * 100).toFixed(2)

export const positiveOrNegative = x => (x > 0 ? styles.positive : styles.negative)

const styles = {
  positive: {
    color: '#0f9d58'
  },
  negative: {
    color: '#d23f31'
  }
}
