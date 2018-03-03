import { app, h } from 'hyperapp';

const state = {
  apiRes: [],
  msg: 'ボタンを押してデータ取得開始',
  isFeching: false
};

const actions = {
  getData: () => async (state, actions) => {
    if (state.isFeching) {
      return;
    }
    actions.setFetching(true);
    actions.setMsg('データ取得中…');
    actions.setResult(
      await fetch('https://script.google.com/macros/s/AKfycbyC1gQm1b6wGO8eIIO5BKGA5n6ePawqOJQ5CC-wtRm7TnIwWKw/exec')
        .then(data => data.json())
    );
    actions.setMsg('データ取得完了！');
    actions.setFetching(false);
  },
  setResult: apiRes => state => ({ apiRes }),
  setMsg: msg => state => ({ msg }),
  setFetching: isFeching => state => ({ isFeching })
};

const view = (state, actions) => (
  <div class="container">
    <h1 class="center title">PPP WebAPI</h1>
    <div class="row">
      <button
        class="center column"
        onclick={() => actions.getData()}
        disabled={state.isFeching}>
        データ取得
      </button>
      <p class="column center">{state.msg}</p>
    </div>
    <table>
      <tr>
        <th>no</th>
        <th>name</th>
        <th>animal</th>
      </tr>
      {state.apiRes.map(item => (
          <tr>
            <td>{item.no}</td>
            <td>{item.name}</td>
            <td>{item.animal}</td>
          </tr>
      ))}
    </table>
  </div>
);

app(state, actions, view, document.body);
