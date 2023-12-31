import ClickToolBarAction from './ClickToolBarAction';
/**
 * 确认
 */
export default class FinishAction extends ClickToolBarAction {
  constructor(protected onclick: () => void) {
    super(
      `<svg t="1687334768906" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28097" width="200" height="200"><path d="M896 288a32 32 0 0 0-54.656-22.592L416 690.752 182.656 457.408a32 32 0 1 0-45.264 45.232l255.952 255.952c5.808 5.824 13.808 9.408 22.656 9.408s16.848-3.584 22.64-9.392l447.952-447.952c5.824-5.808 9.408-13.808 9.408-22.656z" p-id="28098"></path></svg>`
    );
  }
  actived(): void {
    this.onclick();
  }
}
