import { useState, type FormEvent } from "react";
import { Html } from "@react-three/drei";
import { useCockpitStore } from "../../store/cockpitStore";

const CommanderPanel = () => {
  const [name, setName] = useState("");
  const setCommanderName = useCockpitStore((state) => state.setCommanderName);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCommanderName(name);
  };

  return (
    <group position={[0, 0.9, -1.9]}>
      <pointLight color="#4bc8f5" intensity={7} distance={5} />
      <Html transform center position={[0, 0, 0]} distanceFactor={1.5} className="dashboard-html" zIndexRange={[20, 0]}>
        <form className="dashboard-hologram identity-hologram" onSubmit={submit}>
          <div className="hologram-kicker"><span>SECURITY PROTOCOL 01</span><i /></div>
          <h1>IDENTITY REQUIRED</h1>
          <label htmlFor="commander-name">ENTER COMMANDER NAME</label>
          <input
            id="commander-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={32}
            autoComplete="name"
            autoFocus
            placeholder="COMMANDER"
          />
          <button type="submit" disabled={!name.trim()}>CONFIRM</button>
        </form>
      </Html>
    </group>
  );
};

export default CommanderPanel;
