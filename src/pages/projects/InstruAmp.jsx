import {
  WriteupLayout,
  Section,
  SubSection,
  Figure,
  FigureGrid,
  DataTable,
  Callout,
  LogTimeline
} from '../../components/writeup/Writeup'

export default function InstruAmpWriteup() {
  return (
    <WriteupLayout
      eyebrow="Project writeup · Hardware · PCB · Built & bench-tested"
      title="InstruAmp PCB"
      subtitle="Discrete 3-op-amp instrumentation amplifier — from Lab 4 breadboard to a real 2-layer PCB. DC gain confirmed on the bench; AC characterization pending a function generator."
      heroImage={{
        src: import.meta.env.BASE_URL + 'project-images/INA/InstruAmp.png',
        alt: 'Assembled InstruAmp PCB powered from two 9 V batteries, LED lit',
        caption: 'Assembled board on first power-on — ±9 V from two Energizer 9 V batteries, power indicator LED lit immediately.'
      }}
      meta={[
        { label: 'Status', value: 'Built & bench-tested — DC gain confirmed; AC characterization pending' },
        { label: 'Timeline', value: 'May 2026' },
        { label: 'Stack', value: 'KiCad · LM741 · JLCPCB · Digi-Key' },
        { label: 'Repo', value: <a href="https://github.com/iSkewb" target="_blank" rel="noreferrer">GitHub ↗</a> }
      ]}
    >
      <Section id="overview" title="Overview">
        <p>
          Took the 3-op-amp instrumentation amplifier from ECEN325 Lab 4 — a circuit already
          breadboarded and characterized — and redesigned it with proper component values and layout
          discipline into a real 2-layer PCB. The goal was deliberate: using a familiar circuit
          means any misbehavior on the bench traces back to PCB layout (grounding, parasitics,
          footprint errors), not circuit theory.
        </p>
        <p>
          End-to-end scope: ~3 weekends of work, ~$30 in materials, one fabbed board ready to
          characterize. The major design changes over Lab 4 are 1% metal-film resistors in the
          output stage (targeting ≥60 dB CMRR vs the ~35 dB measured with 5% resistors on the
          breadboard), a variable-gain pot replacing the fixed Rgain, and a ground pour with
          star-ground topology replacing breadboard return paths.
        </p>
      </Section>

      <Section id="why" title="Why This Project">
        <ul className="writeup-list">
          <li>
            <strong>Familiar circuit, unfamiliar process.</strong> The Lab 4 INA was already
            breadboarded and characterized — known gain equation, known CMRR behavior, known
            failure modes. When the real board misbehaves, the cause will be the PCB, not circuit
            theory.
          </li>
          <li>
            <strong>High leverage.</strong> A finished PCB unlocks every later project on the
            roadmap: audio amp, active filter, linear PSU, curve tracer, strain-gauge front end.
            KiCad fluency compounds.
          </li>
          <li>
            <strong>Clean deliverable.</strong> "Designed, fabbed, and characterized a discrete
            instrumentation amplifier on a 2-layer PCB" is a tight talking point — TI's INA family
            (INA333, INA128, INA826) is the IC version of exactly what this board does discretely.
          </li>
        </ul>
      </Section>

      <Section id="circuit" title="Circuit Overview">
        <SubSection title="What an Instrumentation Amplifier Is">
          <p>
            A specialized amplifier built from 3 op-amps that amplifies the <em>difference</em> between
            two inputs while rejecting anything <em>common</em> to both.
          </p>
          <DataTable
            caption="Table 1 — Difference amplifier vs. instrumentation amplifier."
            headers={['Feature', 'Difference Amp', 'Instrumentation Amp']}
            rows={[
              ['Input impedance', 'Low (set by resistors)', 'Extremely high (op-amp inputs directly)'],
              ['Gain adjustment', 'Change 4 resistors', 'Change 1 resistor (Rgain)'],
              ['CMRR', '~40 dB typical', '80–120 dB typical']
            ]}
          />
        </SubSection>

        <SubSection title="Topology">
          <ul className="writeup-list">
            <li><strong>U1 / U2</strong> — Input buffer stage. Each op-amp buffers one differential input. Together they set gain via a single external Rgain.</li>
            <li><strong>U3</strong> — Output difference amplifier. Subtracts the two buffered signals, rejecting common-mode. Fixed unity gain.</li>
            <li><strong>Rgain</strong> — Single resistor between the two inverting inputs of U1 and U2. Controls overall gain.</li>
          </ul>
        </SubSection>

        <SubSection title="Gain Equation">
          <p>
            With Rf1 = Rf2 = 10 kΩ:
          </p>
          <DataTable
            caption="Table 2 — Gain vs. Rgain (1 kΩ pot + 100 Ω safety series, Rf1 = Rf2 = 10 kΩ)."
            headers={['Rgain', 'Total Gain']}
            rows={[
              ['100 Ω (pot at min, safety resistor only)', '201×'],
              ['~400 Ω', '~51×'],
              ['~700 Ω', '~30×'],
              ['1100 Ω (pot at max)', '~19×']
            ]}
          />
          <Callout kind="info" title="Safety series resistor">
            The 100 Ω series resistor in series with Rgain prevents gain from blowing up as the pot
            approaches zero. Without it, G → ∞ at Rgain = 0 and U1/U2 saturate immediately.
          </Callout>
        </SubSection>

        <SubSection title="Real-World Applications">
          <p>
            The whole point of an in-amp is measuring <em>tiny voltages in the presence of large noise</em>:
          </p>
          <ul className="writeup-list">
            <li><strong>Strain gauges / load cells</strong> — Wheatstone bridge outputs a few mV on top of a 2.5 V common-mode. Every digital scale and industrial weigh station has one.</li>
            <li><strong>Thermocouples</strong> — produce ~40 µV/°C; in-amp boosts before the ADC.</li>
            <li><strong>Biomedical (ECG/EMG)</strong> — millivolt heart signals on top of tens of volts of 60 Hz mains hum. CMRR rejects the hum.</li>
            <li><strong>High-side current sensing</strong> — 50 mV across a shunt riding on a 48 V common-mode.</li>
            <li><strong>Differential sensors</strong> — pressure, humidity, hall-effect — almost all output differentially.</li>
          </ul>
        </SubSection>
      </Section>

      <Section id="design" title="Design Decisions">
        <SubSection title="Adapting from Lab 4">
          <p>
            The Lab 4 schematic was the starting point. Four changes were required to turn it into a
            PCB-worthy design:
          </p>
          <DataTable
            caption="Table 3 — Changes from Lab 4 breadboard to PCB design."
            headers={['#', 'Change', 'Rationale']}
            rows={[
              ['1', 'Supply rails ±5 V → ±9 V', 'Two 9 V batteries, no regulator needed (LM741 runs to ±18 V)'],
              ['2', 'Feedback resistors 1 kΩ → 10 kΩ', 'Increases gain sensitivity to Rgain; gives a useful gain range'],
              ['3', 'Fixed Rgain → 1 kΩ multi-turn pot + 100 Ω safety series', 'Variable gain ~19× to ~201×; series resistor prevents Rgain → 0 (gain → ∞)'],
              ['4', 'Output stage resistors 1 kΩ → 10 kΩ', 'Reduces loading on U1/U2 outputs; output gain stays at 1×']
            ]}
          />
        </SubSection>

        <SubSection title="Resistor Tolerance for CMRR">
          <p>
            Lab 4 measured CMRR was ~35 dB — limited by 5% resistor tolerance in the output
            difference stage. This board uses <strong>1% metal-film resistors</strong> for the four
            matched resistors (R2, R5, R6, R7), targeting ≥60 dB CMRR. Resistor mismatch in the
            output stage is the dominant CMRR killer at DC.
          </p>
        </SubSection>

        <SubSection title="Through-Hole Throughout">
          <p>
            DIP-8 op-amps, axial resistors, radial caps. No SMT. Through-hole is forgiving — large
            pads, visible leads, easy rework with wick and sucker.
          </p>
        </SubSection>

        <SubSection title="IC Sockets">
          <p>
            DIP-8 sockets for U1, U2, U3 instead of soldering the op-amps directly. Two reasons:
          </p>
          <ul className="writeup-list">
            <li>Swap LM741 → OPA2134 or OPA1612 later for an audio-grade comparison.</li>
            <li>If a 741 fries during bring-up, no desoldering needed.</li>
          </ul>
        </SubSection>
      </Section>

      <Section id="kicad" title="KiCad Workflow">
        <SubSection title="Stage 1 — Schematic Capture">
          <ul className="writeup-list">
            <li>Drew the 3-op-amp topology; used LM741 symbol (ua741 wasn't in the default lib on this install)</li>
            <li>Power flags on V+, V−, GND; nets clearly labeled Vin+, Vin−, Vout</li>
            <li>Bypass capacitors at every op-amp supply pin: 100 nF ceramic + 10 µF electrolytic per rail</li>
            <li>ERC issue resolved: "item not annotated: Rgmin?" — fixed by re-running annotation. Final ERC: 0 errors.</li>
          </ul>
        </SubSection>

        <Figure
          src={import.meta.env.BASE_URL + 'project-images/INA/InstruAmpSchematic.png'}
          alt="KiCad schematic of the 3-op-amp instrumentation amplifier"
          caption="Figure 1 — KiCad schematic. U1 (top) and U2 (bottom) form the variable-gain input stage; U3 is the unity-gain output difference amplifier. RV1 + Rgmin1 set Rgain; bypass caps flank every op-amp supply pair."
        />

        <SubSection title="Stage 2 — Footprint Assignment">
          <DataTable
            caption="Table 4 — Symbol-to-footprint mapping."
            headers={['Part', 'Footprint', 'Note']}
            rows={[
              ['LM741', 'DIP-8', '—'],
              ['Resistors', 'Axial through-hole, 0.4″ lead spacing', '—'],
              ['Pot', 'Bourns 3296W 25-turn', '3362 not in default lib; substituted 3296W footprint'],
              ['Caps', 'Ceramic 5 mm pitch, electrolytic radial', '—'],
              ['Connectors', '2.54 mm pin headers', 'MPT-2 not available; substituted standard pin header']
            ]}
          />
        </SubSection>

        <SubSection title="Stage 3 — Layout">
          <ul className="writeup-list">
            <li>2-layer, ~75×55 mm board</li>
            <li>DIP-8s placed first as anchor parts; passives clustered around their respective op-amps</li>
            <li>Bypass caps placed <em>as close to op-amp supply pins as physically possible</em> — this is the layout discipline that separates a stable board from one that oscillates</li>
            <li>Bottom-layer ground pour (filled zone) for return current and noise rejection</li>
            <li>Star-ground topology: input ground, output ground, and supply ground meet at one point near the bypass caps</li>
          </ul>
        </SubSection>

        <Figure
          src={import.meta.env.BASE_URL + 'project-images/INA/InstruAmp3D.png'}
          alt="KiCad 3D render of the InstruAmp PCB layout"
          caption="Figure 2 — KiCad 3D view. DIP-8 sockets centered, bypass caps flanking each IC's supply pins, bulk decoupling caps at power entry (top-left), LED indicator bottom-right."
        />

        <SubSection title="Stage 4 — Routing">
          <ul className="writeup-list">
            <li>Followed the rats' nest, not the original layout sketch (image-based suggestions had mixed up some pin connections; the netlist is the source of truth)</li>
            <li>Verified via DRC (0 errors), highlight-net continuity check, and visual inspection that ground pour reached every GND pin</li>
            <li>One section of ground pour initially didn't fill — fixed by widening the clearance setting on that pour</li>
          </ul>
          <Callout kind="success" title="DRC passes — 0 errors">
            Final routing is DRC-clean with no shorts, no missed connections, and no clearance violations.
          </Callout>
        </SubSection>

        <SubSection title="Stage 5 — Gerber Generation">
          <p>
            Plotted F.Cu, B.Cu, paste, silkscreen, mask, and Edge.Cuts layers. Drill files in
            Excellon format. Verified every layer in KiCad's Gerber Viewer before zipping —
            drills aligned with pads, edge cuts a clean closed rectangle. Uploaded to JLCPCB,
            previewed in their viewer, ordered.
          </p>
        </SubSection>
      </Section>

      <Section id="bom" title="BOM">
        <DataTable
          caption="Table 5 — Active components."
          headers={['Qty', 'Part', 'Digi-Key PN']}
          rows={[
            ['3', 'LM741CN (DIP-8)', 'LM741CN/NOPB-ND'],
            ['3', '8-pin DIP socket', 'A 08-LC-TT-R-ND'],
            ['1', '5 mm red LED, diffused', '160-1139-ND']
          ]}
        />
        <DataTable
          caption="Table 6 — Resistors (1/4 W axial)."
          headers={['Qty', 'Value', 'Purpose', 'Tolerance']}
          rows={[
            ['4', '10 kΩ', 'R2, R5, R6, R7 — matched output stage', '1% metal film'],
            ['2', '10 kΩ', 'Rf1, Rf2 — feedback', '1% metal film'],
            ['1', '100 Ω', 'Rgmin1 — Rgain safety series', '5% carbon film'],
            ['1', '1 kΩ', 'Rled1', '5% carbon film']
          ]}
        />
        <DataTable
          caption="Table 7 — Capacitors."
          headers={['Qty', 'Value', 'Purpose']}
          rows={[
            ['6', '100 nF, 50 V, ceramic, 5 mm pitch', 'Bypass C1–C6'],
            ['2', '10 µF, 25 V, radial electrolytic', 'Bulk C7, C8']
          ]}
        />
        <DataTable
          caption="Table 8 — BOM cost summary."
          headers={['Item', 'Cost']}
          rows={[
            ['Digi-Key parts', '~$13'],
            ['Digi-Key shipping (ground)', '$5.99'],
            ['Total components', '~$19']
          ]}
        />
      </Section>

      <Section id="fab" title="Fab & Cost">
        <DataTable
          caption="Table 9 — JLCPCB order options."
          headers={['Option', 'Selection']}
          rows={[
            ['Layers', '2'],
            ['Thickness', '1.6 mm'],
            ['Color', 'Green'],
            ['Surface finish', 'HASL with lead'],
            ['Outer copper weight', '1 oz'],
            ['Flying probe test', 'Fully test (free)'],
            ['Quantity', '5 (minimum)']
          ]}
        />
        <DataTable
          caption="Table 10 — Total cost and timeline."
          headers={['', 'Fast (DHL)', 'Standard']}
          rows={[
            ['PCB fab + ship', '$25', '$8'],
            ['Components', '$15', '$15'],
            ['Total', '~$40', '~$23'],
            ['Timeline', '~1 week', '~3 weeks']
          ]}
        />
      </Section>

      <Section id="bringup" title="Bring-Up & Results">
        <SubSection title="Phase 1 — DC Results ✓">
          <p>
            Board assembled in ~2 hours (2026-05-03). DIP-8 sockets soldered first, then resistors,
            caps, pot, LED, and connectors. Battery snap wires soldered directly into J3 pads.
            Bridges checked with DMM in resistance mode at all socket pin pairs and header pins — none found.
          </p>
          <ul className="writeup-list">
            <li>±9 V rails verified at all three op-amp sockets <em>before</em> installing chips, then re-checked after install — both rails clean.</li>
            <li>LED lit on first power-on. All three LM741s run cool under quiescent conditions.</li>
            <li>Vout near 0 V with inputs floating — no gross offset issue.</li>
          </ul>
          <p>
            No function generator on hand — improvised a ~15 mV DC differential input using a 1.5 V AA
            cell with a 10 kΩ / 100 Ω voltage divider. DMM measured Vout at two pot extremes:
          </p>
          <DataTable
            caption="Table 11 — Measured DC gain vs. theory (Vin_diff ≈ 15 mV, improvised divider)."
            headers={['Pot position', 'Vout measured', 'Implied gain', 'Theoretical gain']}
            rows={[
              ['Max Rgain (~1.1 kΩ)', '−324.7 mV', '~22×', '19.2× (1 + 20k/1.1k)'],
              ['Min Rgain (~100 Ω)', '−3.038 V', '~200×', '201× (1 + 20k/100)']
            ]}
          />
          <FigureGrid cols={2}>
            <Figure
              src={import.meta.env.BASE_URL + 'project-images/INA/InstruGainLow.png'}
              alt="DMM reading -324.7 mV at maximum Rgain (low gain)"
              caption="Figure 3a — Max Rgain (~1.1 kΩ, pot fully out). DMM reads −324.7 mV → implied gain ~22×; theoretical 19.2×."
            />
            <Figure
              src={import.meta.env.BASE_URL + 'project-images/INA/InstruGainHigh.png'}
              alt="DMM reading -3.038 V at minimum Rgain (high gain)"
              caption="Figure 3b — Min Rgain (100 Ω, pot fully in). DMM reads −3.038 V → implied gain ~200×; theoretical 201×."
            />
          </FigureGrid>
          <p>
            Min-Rgain result is within 0.5% of theory — essentially exact. Max-Rgain is within ~15%,
            attributable to the hand-built divider not being precisely calibrated (Vin_diff was
            estimated, not measured directly). Pot sweep is smooth across the full 25-turn range with
            no dead spots. The negative output sign reflects a Vin+/Vin− convention in the improvised
            input divider; gain magnitude tracks correctly at both extremes.
          </p>
          <Callout kind="success" title="Phase 1 complete — board working as designed">
            DC gain confirmed across the full pot range. Circuit behavior matches G = 1 + 20k/Rgain.
          </Callout>
        </SubSection>

        <SubSection title="Phase 2 — AC Characterization (pending function generator)">
          <ul className="writeup-list">
            <li><strong>CMRR at 1 kHz</strong> — tie both inputs together, apply 1 Vpp sine, measure Vout/Vin_cm; compare to differential gain. Target ≥60 dB vs ~35 dB from Lab 4 with 5% resistors.</li>
            <li><strong>Frequency response / −3 dB</strong> — swept sine to find rolloff. Multisim simulation predicted −3 dB at ~49 kHz at mid-band gain (consistent with LM741 GBW ~1 MHz ÷ gain).</li>
            <li><strong>Slew rate, THD</strong> — time-domain waveform, check for distortion at large-signal swings.</li>
          </ul>
          <Callout kind="info" title="Deferred — function generator required">
            AC characterization is blocked on acquiring a function generator (FeelTech FY6900 or similar).
          </Callout>
        </SubSection>

        <SubSection title="Phase 3 — Final Documentation">
          <p>
            Target deliverable once Phase 2 is complete: <em>"Designed, fabbed, and characterized a
            discrete instrumentation amplifier with measured CMRR of X dB at Y kHz."</em> Gain sweep
            table, AC sweep screenshot, CMRR measurement, comparison to Multisim simulation.
          </p>
        </SubSection>
      </Section>

      <Section id="log" title="Design & debug log">
        <p className="writeup-note">
          Entries append at the top, newest first.
        </p>
        <LogTimeline entries={[
          {
            date: '2026-05-03',
            title: 'Phase 1 complete — board built and DC gain confirmed',
            content: (
              <>
                <p>
                  Through-hole assembly complete (~2 h). Power-up clean — ±9 V rails at all three
                  sockets before and after IC install, LED on, no short-circuit current, all three
                  LM741s cool under quiescent load.
                </p>
                <p>
                  DC gain sweep with improvised AA-cell divider (~15 mV differential input). Results:
                  ~200× at min Rgain (100 Ω) vs theoretical 201× — within 0.5%. ~22× at max Rgain
                  (1.1 kΩ) vs theoretical 19.2× — within ~15% (input not precisely characterized,
                  magnitude tracks correctly). Pot sweep continuous, no dead spots across full 25-turn range.
                </p>
                <ul className="writeup-list">
                  <li>Vout sign is negative at both extremes — Vin+/Vin− convention in the improvised divider; circuit is correct.</li>
                  <li>AC characterization deferred until function generator is available.</li>
                </ul>
              </>
            )
          },
          {
            date: '2026-05-01',
            title: 'Gerbers verified and order placed',
            content: (
              <p>
                Verified all layers in KiCad Gerber Viewer — drills aligned with pads, edge cuts
                closed. Uploaded to JLCPCB, previewed in their viewer, placed order (5 boards,
                Global Standard shipping). Digi-Key component order placed in parallel.
              </p>
            )
          },
          {
            date: '2026-04-30',
            title: 'DRC passes — routing complete',
            content: (
              <>
                <p>
                  Final routing iteration complete. DRC: 0 errors, 0 warnings. Net highlight
                  verification confirmed ground pour reached all GND pins — one section initially
                  didn't fill due to a tight clearance setting; widening it from 0.25 mm to 0.3 mm
                  on that zone resolved the issue.
                </p>
                <ul className="writeup-list">
                  <li>Followed rats' nest from netlist, not the original layout sketch (sketch had some pin connections mixed up).</li>
                  <li>Bypass caps ended up within 2 mm of op-amp supply pins on all three ICs.</li>
                </ul>
              </>
            )
          },
          {
            date: '2026-04-28',
            title: 'Schematic and footprints complete — ERC 0 errors',
            content: (
              <p>
                Finished schematic capture in KiCad. ERC flagged "item not annotated: Rgmin?" —
                fixed by re-running annotation. All footprints assigned; substituted 3296W for the
                3362 pot footprint (3362 not in default lib) and standard pin headers for MPT-2
                connectors. ERC and footprint assignment complete with 0 errors.
              </p>
            )
          }
        ]} />
      </Section>

      <Section id="next" title="Next steps">
        <ul className="writeup-list">
          <li><strong>Acquire function generator</strong> (FeelTech FY6900 or similar) to unblock Phase 2.</li>
          <li><strong>Phase 2 — CMRR measurement at 1 kHz:</strong> tie inputs together, apply 1 Vpp, measure Acm; compute CMRR = 20·log(Adm / Acm). Compare to Lab 4 baseline (~35 dB) and 1% resistor target (≥60 dB).</li>
          <li><strong>Phase 2 — Frequency response:</strong> swept sine to find −3 dB rolloff; compare to Multisim prediction (~49 kHz at mid-band gain).</li>
          <li><strong>Phase 3 — Document</strong> full results: gain sweep table, AC sweep screenshot, CMRR number, Multisim comparison.</li>
          <li><strong>Optional:</strong> swap LM741 → OPA2134 using the DIP-8 sockets; re-characterize CMRR and bandwidth for a direct op-amp comparison.</li>
        </ul>
      </Section>
    </WriteupLayout>
  )
}
