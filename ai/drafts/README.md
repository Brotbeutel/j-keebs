# Drafts

Deliverables of the **Writer** and **Lawyer** roles land here before they are integrated into the site. Nothing in this folder is published.

- File name: `YYYY-MM-DD-<topic>-writer.md` or `YYYY-MM-DD-<topic>-lawyer.md`.
- Lifecycle: `draft` → `owner-approved` → `integrated` (an implementer pastes it verbatim into `src/` in a work package; the status line in the file is updated). Integrated drafts stay as a record.
- Formats: Writer → "Text package" (`ai/CONTENT.md`); Lawyer → "Legal memo" (`ai/LEGAL.md`).
- An implementer never integrates a draft whose status is not `owner-approved`.
- Integrated or rejected drafts may be deleted by the owner once the result is live and approved; the site files are then the record. A deleted draft is not restored by later handoff ZIPs.
