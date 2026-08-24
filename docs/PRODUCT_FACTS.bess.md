# BESS Desktop — product facts

**This file is the only permitted factual source for BESS Desktop docs.** If a
number, label, or behaviour is not in this file, do not state it on a page.
Every value cites its source as `apps/bess-tool/.../file.py:LINE` in the
`PVlayout_Advance` repo. Publish the value the shipped UI uses; where the code's
default and the shipped UI disagree, note it under "Known-stale" and publish the
UI value.

Source-file aliases used below:
- **GUI** — `apps/bess-tool/bess_tool/seci_bess_gui.py`
- **PM** — `apps/bess-tool/bess_tool/plant_model.py`
- **PD** — `apps/bess-tool/bess_tool/plant_designer.py`
- **RD** — `apps/bess-tool/bess_tool/report_doc.py`
- **TC** — `apps/bess-tool/bess_tool/trial_client.py`
- **LC** — `apps/bess-tool/bess_tool/licensing.py`

## 1. Product identity
BESS Desktop — window title "BESS Project Design Solution   │   Hybrid RE +
Battery Energy Storage System" (`apps/bess-tool/bess_tool/seci_bess_gui.py:2317`).
Standalone tkinter app; entry point `bess-tool` (`apps/bess-tool/bess_tool/seci_bess_gui.py:8648`).
