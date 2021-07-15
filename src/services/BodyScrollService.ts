/* External dependencies */
import { autobind } from 'core-decorators'

/* Internal dependencies */
const noop = () => {}

class BodyScrollService {
  scrollY: number = window.scrollY

  clientY: number = 0

  isSystemScroll: boolean = false

  onUp: () => void = noop

  subscribeScrollEvents(onUp: () => void) {
    this.scrollY = window.scrollY
    this.clientY = 0

    this.onUp = onUp

    window.addEventListener('touchmove', this.handleTouchMove)
    window.addEventListener('touchend', this.handleTouchEnd)
    window.addEventListener('scroll', this.handleScroll, { passive: false })
  }

  unsubscribeScrollEvents() {
    this.onUp = noop
    window.removeEventListener('touchmove', this.handleTouchMove)
    window.removeEventListener('touchend', this.handleTouchEnd)
    window.removeEventListener('scroll', this.handleScroll)
  }

  scrollTo(x: number, y: number): void {
    this.isSystemScroll = true
    window.scrollTo(x, y)
    window.setTimeout(() => {
      this.isSystemScroll = false
    }, 150)
  }

  @autobind
  handleTouchEnd() {
    this.clientY = 0
  }

  @autobind
  handleTouchMove(event: TouchEvent) {
    const currentY = event.touches[0].clientY

    if (!this.clientY) {
      this.clientY = currentY
    }

    if (!this.isSystemScroll && (this.clientY < currentY)) {
      this.onUp()
      return
    }

    this.clientY = currentY
  }

  @autobind
  private handleScroll() {
    const currentScrollY = window.scrollY

    if (!this.scrollY) {
      this.scrollY = currentScrollY
    }

    if (
      !this.isSystemScroll &&
      currentScrollY < this.scrollY
    ) {
      this.onUp()
      return
    }

    this.scrollY = currentScrollY
  }
}

export default new BodyScrollService()
