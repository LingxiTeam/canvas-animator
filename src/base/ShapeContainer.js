import Shape from './Shape'

export default class ShapeContainer extends Shape {
  constructor (context = null, x = 0, y = 0) {
    super(context, x, y)
    this.list = []
  }

  reset () {
    super.reset()
    if (this.list) {
      for (let i = 0; i < this.list.length; i++) {
        this.remove(i)
      }
    } else {
      this.list = []
    }
  }

  add (entity) {
    for (let i = 0; i < this.list.length + 1; i++) {
      if (!this.list[i]) {
        entity.context = this.context
        entity.distance = this.distance
        this.list[i] = entity
        // console.log('add at: ' + i)
        return i
      }
    }
    return -1
  }

  remove (index) {
    const entity = this.list[index]
    if (entity) {
      this.list[index] = null
      // console.log('remove at: ' + index)
    }
  }

  update (elapsed) {
    super.update(elapsed)
    const autoRemoves = []
    for (let i = 0; i < this.list.length; i++) {
      const entity = this.list[i]
      if (entity) {
        entity.update(elapsed)
        if (entity.stopped && entity.autoRemoveWhenStopped) {
          autoRemoves.push(i)
        }
      }
    }
    for (let i = 0; i < autoRemoves.length; i++) {
      this.remove(autoRemoves[i])
    }
  }

  draw () {
    this._beforeDraw()
    for (let i = 0; i < this.list.length; i++) {
      const entity = this.list[i]
      if (entity) {
        entity.draw()
      }
    }
    this._afterDraw()
  }
}

/*
ShapeContainer.rotateX = (x, y, z, rotation) => {
  const _y = y * Math.cos(rotation) - z * Math.sin(rotation)
  const _z = y * Math.sin(rotation) + z * Math.cos(rotation)
  return { x, y: _y, z: _z }
}
ShapeContainer.rotateY = (x, y, z, rotation) => {
  const _z = z * Math.cos(rotation) - x * Math.sin(rotation)
  const _x = z * Math.sin(rotation) + x * Math.cos(rotation)
  return { x: _x, y, z: _z }
}
ShapeContainer.rotateZ = (x, y, z, rotation) => {
  const _x = x * Math.cos(rotation) - y * Math.sin(rotation)
  const _y = x * Math.sin(rotation) + y * Math.cos(rotation)
  return { x: _x, y: _y, z }
}
ShapeContainer.rotate = (x, y, z, rotationX, rotationY, rotationZ) => {
  let r = { x, y, z }
  r = ShapeContainer.rotateX(r.x, r.y, r.z, rotationX)
  r = ShapeContainer.rotateY(r.x, r.y, r.z, rotationY)
  r = ShapeContainer.rotateZ(r.x, r.y, r.z, rotationZ)
  return r
}
*/
