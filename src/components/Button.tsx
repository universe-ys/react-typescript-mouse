interface ButtonProps {
  selected?: boolean;
  name: string;
  onClick: () => void;
}

export default function Button ({selected, name, onClick}: ButtonProps) {
  return (
    <div style={{
        boxSizing: "border-box",
        width: "100px",
        height: "100px",
        padding: "16px",
        boxShadow: `0 0 0 ${selected? "6" : "1"}px #000 inset`
      }}
      onClick={onClick}
    >
      <img src={`/images/${name}.png`} width="100%" height="100%" />
    </div>
  ); 
} 