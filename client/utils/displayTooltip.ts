export const displayTooltip = (type: string): string => {
  switch (type) {
    case 'reply':
      return '返信'
    case 'repost':
      return '再投稿'
    case 'like':
      return 'いいね'
    case 'share':
      return '共有'
    case 'analytics':
      return 'アナリティクス'
    case 'media':
      return 'メディア'
    case 'gif':
      return 'gif画像'
    case 'questionnare':
      return '投票'
    case 'face':
      return '絵文字'
    case 'schedule':
      return '予約設定'
    case 'more':
      return 'もっと見る'
    default:
      break
  }
}