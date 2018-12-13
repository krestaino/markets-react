const icons = {
  'Energy': { name: 'bolt', type: 'FontAwesome' },
  'Communication Services': { name: 'radio-tower', type: 'Octicons' },
  'Consumer Discretionary': { name: 'beach-access', type: 'MaterialIcons' },
  'Materials': { name: 'barrel', type: 'MaterialCommunityIcons' },
  'Technology': { name: 'computer', type: 'MaterialIcons' },
  'Industrials': { name: 'tools', type: 'Entypo' },
  'Financials': { name: 'attach-money', type: 'MaterialIcons' },
  'Real Estate': { name: 'home', type: 'MaterialIcons' },
  'Health Care': { name: 'local-hospital', type: 'MaterialIcons' },
  'Consumer Staples': { name: 'food', type: 'MaterialCommunityIcons' },
  'Utilities': { name: 'water-pump', type: 'MaterialCommunityIcons' }
}

export const sectorIcons = sector => icons[sector] || false
