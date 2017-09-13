/**
 * Bootstrap import
 */
import Bootstrap from './blue-oasis/bootstrap/Bootstrap';

// imitate smartphone
(document.documentElement as any).ontouchstart = new Function();
new Bootstrap().start();
