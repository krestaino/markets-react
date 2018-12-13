const icons = {
  Energy: { name: 'bolt', type: 'FontAwesome' },
  CommunicationServices: { name: 'radio-tower', type: 'Octicons' },
  ConsumerDiscretionary: { name: 'beach-access', type: 'MaterialIcons' },
  Materials: { name: 'barrel', type: 'MaterialCommunityIcons' },
  Technology: { name: 'computer', type: 'MaterialIcons' },
  Industrials: { name: 'tools', type: 'Entypo' },
  Financials: { name: 'attach-money', type: 'MaterialIcons' },
  RealEstate: { name: 'home', type: 'MaterialIcons' },
  HealthCare: { name: 'local-hospital', type: 'MaterialIcons' },
  ConsumerStaples: { name: 'food', type: 'MaterialCommunityIcons' },
  Utilities: { name: 'water-pump', type: 'MaterialCommunityIcons' }
}

export const sectorIcons = sector => icons[sector.replace(/ /g, '')] || false
