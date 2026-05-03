import {
  WriteupLayout,
  Section,
  SubSection,
  Figure,
  DataTable,
  Callout,
  LogTimeline
} from '../../components/writeup/Writeup'

export default function PcbDesignWriteup() {
  return (
    <WriteupLayout
      eyebrow="Project writeup · Hardware · WIP"
      title="Bench Power Supply"
      subtitle="±1.25–15 V, 500 mA-per-rail linear supply with LM317/LM337, full-wave rectifier, and foldback current limiting."
      heroImage={{
        src: '',
        alt: 'Bench power supply hero',
        caption: 'Hero image — replace once board is assembled.'
      }}
      meta={[
        { label: 'Status', value: 'Design phase' },
        { label: 'Timeline', value: 'Apr 2026 – present' },
        { label: 'Stack', value: 'KiCad · LM317 · LM337 · LTspice' },
        { label: 'Repo', value: <a href="https://github.com/iSkewb" target="_blank" rel="noreferrer">GitHub ↗</a> }
      ]}
    >
      <Section id="overview" title="Overview">
        <p>
          A ±1.25 V to ±15 V, 500 mA-per-rail linear bench power supply built around a full-wave
          rectifier, LM317/LM337 linear regulators, and foldback current limiting. The design is
          deliberately conservative so that every major failure mode is visible on the bench: ripple
          on the bulk capacitor, junction heating on the regulator, and the foldback knee on the
          output I-V curve.
        </p>
        <p>
          The primary goals are to get hands-on experience with power electronics and thermal design,
          produce a portfolio artifact demonstrating analog design, and build the primary bench supply
          for future personal projects. This is not a precision supply, not a switcher, and not
          a high-current supply — those boundaries are intentional. Dissipated power is the learning
          opportunity, not an obstacle.
        </p>
      </Section>

      <Section id="specs" title="Specifications">
        <DataTable
          caption="Table 1 — Target and stretch specifications."
          headers={['Parameter', 'Target', 'Stretch', 'Rationale']}
          rows={[
            ['V_out, positive rail', '+1.25 to +15 V', '—', '+1.25 V is LM317 floor; +15 V covers op-amp rails'],
            ['V_out, negative rail', '−15 to −1.25 V', 'Tracking mode (ganged pot)', 'Mirror of positive rail; tracking via mechanically ganged pot'],
            ['I_max per rail', '500 mA', '—', 'Matches 1 A transformer sized for two rails; worst-case P_diss = 10 W'],
            ['Output ripple (pp)', '≤5 mV at full load', '≤1 mV', 'LM317 ripple rejection ~65 dB; bulk-cap ripple ~2 V_pp'],
            ['Line regulation', '≤0.05 %/V', '≤0.01 %/V (datasheet)', 'LM317 datasheet-typ ~0.01 %/V'],
            ['Load regulation', '≤15 mV (10 %→100 % load)', '≤10 mV', 'LM317 datasheet-typ ~0.1 %/V = 15 mV at 15 V out'],
            ['Foldback knee current', '600 mA ±10 %', 'Front-panel adjustable 100–600 mA', '—'],
            ['Short-circuit current', '150 mA ±20 %', '—', 'Foldback cuts SC dissipation from 12.6 W to ~3 W'],
            ['Dropout budget', 'V_in − V_out ≥ 3 V at max, T_J = 110 °C', '—', 'LM317 datasheet spec; V_in at cap ripple trough is worst-case'],
            ['Ambient assumption', '35 °C (inside enclosure)', '45 °C', 'Thermal budget predicated on this; needs bench validation'],
            ['Output noise (10 Hz–10 kHz)', '≤500 µV RMS', '≤100 µV RMS (with ADJ bypass + LC filter)', 'Unreferenced baseline ~1 mV RMS; ADJ bypass cap halves it'],
            ['Turn-on overshoot', '≤5 % of setpoint', '0 % (monotonic)', 'LM317 + large output cap can overshoot; mitigated by ADJ cap soft-start'],
            ['Protection', 'Foldback + primary fuse + bleeder + reverse-output diodes', 'Add TVS across binding posts', 'Bleeder prevents shock after power-off; reverse diodes handle back-EMF'],
            ['Total BOM cost', '≤$80', '≤$60', 'Transformer $25 · enclosure $20 · heatsinks $10 · electronics $10 · mechanical $15'],
            ['Total size', '≤6″ × 4″ × 3″ chassis', 'Same, with panel meters', 'Transformer volume is the main constraint'],
          ]}
        />
      </Section>

      <Section id="design" title="Design">
        <SubSection title="Top-level block diagram">
          <p>
            AC mains → primary fuse → power switch → NTC inrush limiter → transformer (18 V RMS,
            center-tap) → bridge rectifier (1N5402 ×4) → bulk cap (4700 µF / 35 V) → LM317 (positive
            rail) and LM337 (negative rail), each on their own heatsink → output divider (R1 = 240 Ω,
            R2 pot) → foldback limiter → output cap → binding post.
          </p>
          <Figure
            src={import.meta.env.BASE_URL + 'project-images/PSU_block.png'}
            alt="Top-level block diagram"
            caption="Figure 1 — Top-level block diagram."
          />
        </SubSection>

        <SubSection title="4.1 Transformer selection">
          <p>Calculations pending.</p>
        </SubSection>

        <SubSection title="4.2 Rectifier & bulk capacitor">
          <p>Calculations pending.</p>
        </SubSection>

        <SubSection title="4.3 LM317 / LM337 feedback network">
          <p>Calculations pending.</p>
        </SubSection>

        <SubSection title="4.4 Foldback current limiter">
          <p>Calculations pending.</p>
        </SubSection>

        <SubSection title="4.5 Thermal budget">
          <p>Calculations pending.</p>
        </SubSection>

        <SubSection title="4.6 Safety stage">
          <p>Calculations pending.</p>
        </SubSection>
      </Section>

      <Section id="schematic" title="Schematic">
        <Figure src="" alt="Full schematic" caption="Figure 2 — Full schematic. Pending." />
      </Section>

      <Section id="simulation" title="Simulation plan & results">
        <p>LTspice simulation plan pending. Key targets: bulk-cap ripple, foldback knee, transient load step response.</p>
      </Section>

      <Section id="bom" title="BOM">
        <p>Bill of materials pending finalized component selection.</p>
      </Section>

      <Section id="pcb" title="PCB plan">
        <p>Layout plan pending schematic completion.</p>
      </Section>

      <Section id="mechanical" title="Mechanical / enclosure">
        <p>Enclosure selection and panel layout pending.</p>
      </Section>

      <Section id="risks" title="Risk register">
        <p>Risk register pending.</p>
      </Section>

      <Section id="test" title="Test plan">
        <p>Test plan pending bring-up.</p>
      </Section>

      <Section id="log" title="Design & debug log">
        <p className="writeup-note">
          Entries append at the top, newest first.
        </p>
        <LogTimeline entries={[
          {
            date: '2026-04-01',
            title: 'Design document drafted',
            content: <p>Completed project summary, specifications table, and top-level block diagram. Design calculation subsections (4.1–4.6) are stubs pending component selection and simulation.</p>
          }
        ]} />
      </Section>

      <Section id="open" title="Open questions & next steps">
        <ul className="writeup-list">
          <li>Select and verify transformer — confirm 18 V RMS center-tap at 1 A continuous.</li>
          <li>Run LTspice simulation for foldback knee and thermal worst-case.</li>
          <li>Finalize R1/R2 divider values and pot selection for output voltage range.</li>
          <li>Validate ambient temperature assumption (35 °C inside enclosure) on the bench.</li>
          <li>Decide on stretch goal: front-panel adjustable current limit vs. fixed foldback.</li>
        </ul>
        <Callout kind="info" title="Tracking mode (stretch)">
          Gang-coupling the positive and negative rail pots for tracking mode is a stretch goal.
          Requires a dual-ganged pot with matched tapers — noting here to evaluate during BOM selection.
        </Callout>
      </Section>
    </WriteupLayout>
  )
}
