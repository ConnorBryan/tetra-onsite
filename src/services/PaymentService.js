import request from 'src/services/Request';
import Card from 'src/models/Card';

export function saveCard(token: string) {
  return request({
    method: 'post',
    url: `/cards/`,
    data: { token },
  }).then(({ data }) => new Card(data));
}

export function getCards() {
  return (request({
    url: '/cards/',
  }): any).then(({ data }: { data: Array<any> }) =>
    data.map(card => new Card(card))
  );
}

export function getDefaultCard() {
  return getCards().then(cards => cards.filter(card => card.isDefault)[0]);
}
