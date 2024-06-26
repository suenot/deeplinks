import { DeepClient, DeepClientInstance } from './client';
import {debug} from './debug.js'
import { Id, Link } from './minilinks';
const moduleLog = debug.extend('package')

/**
 * Represents a deep package
 * 
 * @remarks
 * This class intended to be extended by packages  
 * 
 * @example
```ts
const package = new Package({deep, name});
const {name: packageName} = package;
const batteryLevelValueLinkId = await package.batteryLevelValue.id();
```
  */
export class Package {
  public deep: DeepClientInstance;
  /**
   * Name of the package
   */
  public name: string;

  constructor(options: PackageOptions) {
    const log = moduleLog.extend(this.name)
    log({options})
    this.deep = options.deep;
    this.name = options.name;
  }

  /**
   * Creates an entity
   * 
   * @example
   * #### Create an entity
```ts
class MyPackage extends Package {
  public yourLinkName = this.createEntity("YourLinkName");
}
const myPackage = new MyPackage({deep});
const myLinkId = await myPackage.yourLinkName.id();
const myLinkLocalId = await myPackage.yourLinkName.idLocal();
```
   */
  public createEntity(name: string) {
    const log = moduleLog.extend(this.createEntity.name)
    log({name})
    const result = {
      /**
       * Gets id of the link
       * 
       * @example
       * #### Get id of the link
```ts
const myPackage = new MyPackage({deep});
const myLinkId = await myPackage.yourLinkName.id();
```
       */
      id: async () => {
        const log = moduleLog.extend(this.id.name)
        const result = await this.id(name);
        log({result})
        return result;
      },
      /**
       * Gets id of the link from minilinks
       * 
       * @example
       * #### Get id of the link from minilinks
```ts
const myPackage = new MyPackage({deep});
const myLinkLocalId = await myPackage.yourLinkName.idLocal();
```
       */
      idLocal: () => {
        return this.idLocal(name);
      },
      /**
       * Name of the link
       */
      name: name
    };
    log({result})
    return result;
  }

  /**
   * Gets id of the package link
   * 
   * @example
   * #### Get id of the package link
```ts
const package = new Package({deep});
const myLinkId = await package.id("MyLinkName");
```
   */
  async id(...names: string[]) {
    const log = moduleLog.extend(this.id.name)
    log({names})
    const deepIdArgs: Parameters<DeepClient['id']> = [this.name, ...names]
    log({deepIdArgs})
    const result = await this.deep.id(...deepIdArgs);
    log({result})
    return result;
  }

    /**
   * Gets id of the package link from minilinks
   * 
   * @example
   * #### Get id of the package link from minilinks
```ts
const package = new Package({deep});
await package.applyMiniLinks();
const myLinkId = await package.idLocal("MyLinkName");
```
   */
  idLocal(...names: string[]) {
    const log = moduleLog.extend(this.idLocal.name)
    log({names})
    const deepIdLocalArgs: Parameters<DeepClient['idLocal']> = [this.name, ...names]
    log({deepIdLocalArgs})
    const result = this.deep.idLocal(...deepIdLocalArgs)
    log({result})
    return result;
  }

  /**
   * Pastes your links into minilinks
   * 
   * @example
   * #### Use applyMiniLinks and idLocal
```ts
const package = new Package({deep});
await package.applyMiniLinks();
const deviceLinkId = await package.Device.idLocal();
```
   */
  async applyMiniLinks() {
    const log = moduleLog.extend(this.applyMiniLinks.name)
    const {data: packageLinks} = await this.deep.select({
      up: {
        tree_id: {
          _id: ["@deep-foundation/core", 'containTree']
        },
        parent_id: {
          _id: [this.name]
        }
      }
    })
    log({packageLinks})

    if(!packageLinks) {
      throw new Error(`Package with name ${this.name} is not found`)
    }

    const result = this.deep.minilinks.apply(packageLinks as Link<Id>[])
    log({result})

    return result
  }
}

export interface PackageOptions {
  name: string;
  deep: DeepClientInstance;
}
