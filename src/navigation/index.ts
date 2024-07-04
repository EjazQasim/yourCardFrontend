const navigation = (): any => {
  return [
    {
      title: 'Home',
      icon: 'mdi:user-outline',
      path: '/home'
    },
    {
      title: 'Connections',
      icon: 'mdi:user-group-outline',
      path: '/leads'
    },
    {
      title: 'Insights',
      icon: 'mdi:bar-chart',
      path: '/insights'
    },
    {
      title: 'Settings',
      icon: 'mdi:settings-outline',
      path: '/settings'
    }
  ]
}

export default navigation
