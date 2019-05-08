import React from 'react';

interface Props {
  count: {
    count: number;
    correct: number;
  };
}

export default function Summary({ count: { count, correct } }: Props) {
  return (
    <div>
      Gesamt: {count}
      <br />
      Davon richtig: {correct}
    </div>
  );
}
