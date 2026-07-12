Here is the raw Markdown code for the summary, ready for you to copy and paste without the text formatting getting in the way. I have removed the citation tags from the text so they don't interfere with your next prompt.

# Project Overview: Real-Time Vue 3 Crypto Analytics Dashboard

**Objective:** Build a high-performance, real-time cryptocurrency analytics dashboard using modern frontend architecture, with the potential to scale into a quantitative market analysis tool.
**Timeline:** July 11, 2026 - July 31, 2026.

## 🛠️ Core Technology Stack

- **Framework:** Vue 3 (Composition API) & TypeScript for strong typing and scalable architecture.
- **Build Tool:** Vite for instantaneous Hot Module Replacement.
- **State Management:** Pinia 3 for modular, type-safe, and highly optimized reactive state.
- **Styling:** Native Vanilla CSS leveraging CSS Custom Properties (Variables) to keep dependencies minimal.
- **Visualization:** TradingView's Lightweight Charts, an HTML5 Canvas-based library optimized for handling thousands of financial data points at 60 FPS.
- **Historical Data:** CoinGecko REST API (Free Tier) for comprehensive market snapshots and historical candlestick data.
- **Live Data:** Binance Public WebSocket API for unauthenticated, high-frequency, low-latency live tick data.

## 📅 Development Schedule & Phases

### Phase 1: Infrastructure & Scaffolding (July 11 - July 17)

- Initialize the Vite project with the Vue-TypeScript template.
- Establish a global Native CSS architecture utilizing CSS root variables for a consistent theme (e.g., up/down crypto colors).
- Install core dependencies (`pinia`, `@vueuse/core`) and register the Pinia store at the application entry point.

### Phase 2: High-Performance State Architecture (July 18 - July 21)

- Structure the Pinia store to manage current symbols, historical data arrays, and live ticks.
- **Crucial Optimization:** Utilize Vue's `shallowRef` for storing large market data arrays. This bypasses Vue's default deep Proxy generation, preventing severe memory allocation overhead and UI-blocking garbage collection spikes.

### Phase 3: Visualization & Historical Data (July 22 - July 24)

- Build a reusable chart component wrapping the imperative Lightweight Charts API into a declarative Vue structure.
- Implement `onMounted` and `onUnmounted` hooks to properly instantiate and destroy the chart canvas to prevent memory leaks.
- Fetch historical Open, High, Low, Close (OHLC) arrays from the CoinGecko REST API, format the UNIX timestamps, and populate the chart.

### Phase 4: Real-Time WebSockets (July 25 - July 28)

- Use VueUse's `useWebSocket` composable to establish a connection to Binance's 1-minute Kline (candlestick) stream.
- Configure auto-reconnection logic with exponential backoff to handle network interruptions without hitting Binance IP rate limits.
- **Mitigating UI Lag:** Implement event throttling and data buffering using `requestAnimationFrame` or `useThrottleFn` to batch DOM updates, preventing the Vue reactivity system from being overwhelmed by high-frequency updates.

### Phase 5: Advanced Analytics Integration (July 29 - July 31)

- Transition from a simple visualizer to an analysis tool using the `fast-technical-indicators` library.
- Extract closing prices from the Pinia store to compute technical indicators like the Relative Strength Index (RSI).
- Project these computed datasets onto secondary chart panes synced with the main price chart.
