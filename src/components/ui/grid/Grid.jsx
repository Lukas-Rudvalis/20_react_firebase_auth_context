import './grid.scss';
// apjuosiantis elementas suteikiantis papildomu stiliaus ar funkciju dalyku
function Grid({ cols, children, ul, className = '' }) {
  const inlineStyleObj = {
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
  };
  const Element = ul ? 'ul' : 'div';
  return (
    <Element style={inlineStyleObj} className={`myGrid ${className}`}>
      {children}
    </Element>
  );
}
export default Grid;
