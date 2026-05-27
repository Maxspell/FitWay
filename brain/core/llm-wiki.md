# LLM Wiki Pattern

The LLM Wiki is a knowledge management strategy where an AI agent incrementally builds and maintains a persistent wiki rather than relying on standard RAG (Retrieval-Augmented Generation).

## Core Concept
Instead of rediscovering data from scratch each time, the agent maintains a mutable directory of markdown files (the wiki) that acts as a compounding artifact.

## System Layers
1. **Raw Sources**: Immutable original data.
2. **The Wiki**: Mutable directory of markdown files.
3. **Schema**: Defines agent behavior for interacting with the wiki.

## Key Operations
- **Ingestion**: Adding new data to the system.
- **Querying**: Synthesizing answers by querying the wiki.
- **Linting**: Identifying contradictions, gaps, or outdated information.
- **Navigation**: Using an `index.md` (content-oriented) and `log.md` (chronological).

## Benefits
- **Near-Zero Maintenance Cost**: The LLM handles the bookkeeping that humans usually find tedious.
- **Knowledge Compounding**: Syntheses and discoveries are filed back into the system, increasing its value over time.

## Related Implementations
- **OmegaWiki**: Manages the full paper lifecycle.
- **Synthadoc**: Uses adversarial review to catch unsupported generalizations.
- **sqz**: Focuses on context compression and deduplication.
- **Link / LLM-WIKI-MCP**: Local-first memory via Model Context Protocol.

## Challenges
- Duplicate pages for similar concepts.
- Maintaining a meaningful hierarchy of importance.
