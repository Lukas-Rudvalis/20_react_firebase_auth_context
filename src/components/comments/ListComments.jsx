import React from 'react';
import Card from '../ui/card/Card';

function ListComments({ list }) {
  return (
    <ul className="unlisted">
      {list.map((obj) => (
        <li key={obj.uid}>
          <Card>
            <p>{obj.authorEmail}</p>
            <h4>{obj.title}</h4>
            <p>{obj.body}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export default ListComments;
