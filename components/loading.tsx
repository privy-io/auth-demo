import CanvasContainer from './canvas-container';
import Canvas from './canvas';
import {Header} from './header';
import CanvasSidebar from './canvas-sidebar';

export default function Loading() {
  return (
    <div className="flex h-full flex-col px-6 pb-6">
      <Header />
      <CanvasContainer className="animate-pulse">
        <CanvasSidebar className="animate-pulse" />
        <Canvas className="animate-pulse" />
      </CanvasContainer>
    </div>
  );
}
