import {linuxRepo} from "./linux"
import {reactRepo} from "./react"
import {tensorFlowRepo} from "./tensorflow"
import {cppRepo} from "./cpp"
import {tsRepo} from "./typescript"

export type RepoFile = {
    path: string
    code: string
}

export type Repo = {
    label: string
    url: string
    files: RepoFile[]
}

export const repoOptions: Repo[] = [
    linuxRepo,
    cppRepo,
    tsRepo,
    reactRepo,
    tensorFlowRepo,
]
