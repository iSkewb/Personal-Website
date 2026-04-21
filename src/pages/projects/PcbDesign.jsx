/**
 * PROJECT WRITEUP TEMPLATE
 * ------------------------
 * Duplicate this file to `src/pages/projects/<YourSlug>.jsx`, rename the
 * exported component, then register it in `src/pages/projects/registry.js`
 * under the same slug. Project card "Read writeup" links will route here.
 *
 * Building blocks (all from components/writeup/Writeup.jsx):
 *   <WriteupLayout>   page header, hero image, meta grid
 *   <Section>         titled section with h2
 *   <SubSection>      titled sub-block with h3
 *   <Figure>          image + caption (graceful placeholder if src omitted)
 *   <FigureGrid>      multi-column figure layout
 *   <DataTable>       simple table: headers[], rows[[]]
 *   <Callout>         kind: 'info' | 'warn' | 'success'
 *   <LogTimeline>     dated log entries for design/debug journal
 *   <Code>            monospace code block
 *
 * Images: drop files in public/project-writeups/<slug>/ and reference as
 * src="/project-writeups/<slug>/figure-1.png".
 */
import {
  WriteupLayout,
  Section,
  SubSection,
  Figure,
  FigureGrid,
  DataTable,
  Callout,
  LogTimeline,
  Code
} from '../../components/writeup/Writeup'

export default function PcbDesignWriteup() {
  return (
    <WriteupLayout
      eyebrow="Project writeup · Template"
      title="Project Title — Short Descriptor"
      subtitle="One-sentence summary of what the project does and why it matters."
      heroImage={{
        src: '', // e.g. "/project-writeups/example/hero.png"
        alt: 'Hero image alt text',
        caption: 'Optional caption describing the hero image.'
      }}
      meta={[
        { label: 'Status', value: 'In progress' },
        { label: 'Timeline', value: 'Apr 2026 – present' },
        { label: 'Stack', value: 'KiCad · STM32 · C' },
        { label: 'Repo', value: <a href="https://github.com/iSkewb" target="_blank" rel="noreferrer">GitHub ↗</a> }
      ]}
    >
      <Section id="overview" title="Overview">
        <p>
          Lead paragraph. What is this project, what problem does it solve, and what did you
          actually build? One or two paragraphs is ideal — enough context for someone who lands
          here from a link to understand the scope without scrolling further.
        </p>
        <p>
          Second paragraph if needed — e.g. the high-level constraint that shaped the design, or
          the specific result you want to call out up front (a benchmark, a measurement, a
          debugging narrative).
        </p>
      </Section>

      <Section id="goals" title="Goals & constraints">
        <ul className="writeup-list">
          <li>Concrete goal 1 — something measurable or deliverable.</li>
          <li>Concrete goal 2 — typically a performance, size, or cost target.</li>
          <li>Constraint — what you <em>couldn't</em> do, and why that shaped the design.</li>
        </ul>
      </Section>

      <Section id="design" title="Design">
        <SubSection title="System architecture">
          <p>Describe the block-level design. Link to specific building-block subsystems below.</p>
          <Figure
            src=""
            alt="System block diagram"
            caption="Figure 1 — System block diagram. Replace the placeholder by setting src."
          />
        </SubSection>

        <SubSection title="Component selection">
          <p>Intro sentence explaining how you chose parts — datasheets, tradeoffs, availability.</p>
          <DataTable
            caption="Table 1 — Key components and why they were chosen."
            headers={['Reference', 'Part', 'Package', 'Role', 'Rationale']}
            rows={[
              ['U1', 'STM32G431CBU6', 'UFQFPN48', 'MCU', '170 MHz Cortex-M4 + HRTIM for gate drive'],
              ['U2', 'TPS54308', 'SOT-23-6', '3.3 V buck', 'Up to 3 A, small footprint, 28 V input'],
              ['U3', 'INA240A2', 'SOIC-8', 'Current sense', 'High-side, ±80 V CM, PWM-rejection built in']
            ]}
          />
        </SubSection>

        <SubSection title="Schematic">
          <FigureGrid cols={2}>
            <Figure src="" alt="Power stage schematic" caption="Figure 2a — Power stage." />
            <Figure src="" alt="MCU + sensing schematic" caption="Figure 2b — Logic and sensing." />
          </FigureGrid>
        </SubSection>

        <SubSection title="Layout">
          <p>Describe layout decisions — stackup, return paths, thermal vias, separation of analog/digital grounds, any deliberate tradeoffs.</p>
          <Figure src="" alt="PCB layout top" caption="Figure 3 — Top copper with component placement." />
        </SubSection>
      </Section>

      <Section id="implementation" title="Implementation notes">
        <p>Any non-obvious details that a reader (or future-you) would want to know before replicating this.</p>
        <Code lang="c">{`// Example: clock init showing a specific gotcha
RCC->CR |= RCC_CR_HSEON;
while (!(RCC->CR & RCC_CR_HSERDY)) { /* spin */ }
// HSE must be ready BEFORE switching PLL source, or the bus locks up
RCC->PLLCFGR = (RCC_PLLCFGR_PLLSRC_HSE | (6 << RCC_PLLCFGR_PLLM_Pos));`}</Code>
      </Section>

      <Section id="results" title="Results">
        <p>What happened when you actually ran it? Numbers, waveforms, photos.</p>
        <DataTable
          caption="Table 2 — Measured performance vs. target."
          headers={['Metric', 'Target', 'Measured', 'Notes']}
          rows={[
            ['Switching frequency', '100 kHz', '98.4 kHz', 'HRTIM div-by-17 instead of 16'],
            ['Efficiency @ full load', '≥ 92%', '93.1%', 'At 24 V → 12 V, 5 A'],
            ['Output ripple', '< 50 mV', '38 mV', 'With the 22 µF + 100 nF combo on VOUT']
          ]}
        />
        <Callout kind="success" title="Headline result">
          Leave the most important takeaway here so a reader skimming the page catches it.
        </Callout>
      </Section>

      <Section id="log" title="Design & debug log">
        <p className="writeup-note">
          Append entries at the top. Keep each entry short — what you tried, what happened, what you
          decided. Future-you will thank present-you.
        </p>
        <LogTimeline entries={[
          {
            date: '2026-04-20',
            title: 'v0.2 board arrives — bring-up starts',
            content: (
              <>
                <p>Visual inspection OK. Powered 5 V rail through a current-limited supply (100 mA limit).
                No smoke. 3.3 V rail came up at 3.29 V. MCU does not enumerate — SWD works, so bootloader
                strap is likely wrong.</p>
                <ul className="writeup-list">
                  <li>Measured BOOT0 pin — floating. Should have been pulled low on v0.2.</li>
                  <li>Bodge wire to GND fixed enumeration. Adding pulldown to v0.3 netlist.</li>
                </ul>
              </>
            )
          },
          {
            date: '2026-04-14',
            title: 'Gerbers sent to JLCPCB',
            content: <p>4-layer stackup, 1 oz outer, 0.5 oz inner. Controlled impedance not specified — this is a DC/low-frequency board, USB is the only high-speed net and the traces are short enough to not matter at FS speeds.</p>
          },
          {
            date: '2026-04-02',
            title: 'Switched from TI TPS54308 to LMR33630',
            content: <p>The 08 is EOL at one distributor and the 33630 has better transient response at the same footprint. Pin-compat close enough to swap with a quick copper-plane tweak.</p>
          }
        ]} />
      </Section>

      <Section id="future" title="Open questions / next steps">
        <ul className="writeup-list">
          <li>Things you haven't decided yet.</li>
          <li>Measurements you still want to take.</li>
          <li>Design choices you'd revisit on the next revision.</li>
        </ul>
      </Section>
    </WriteupLayout>
  )
}
